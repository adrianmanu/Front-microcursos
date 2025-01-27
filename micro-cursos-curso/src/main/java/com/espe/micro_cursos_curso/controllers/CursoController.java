package com.espe.micro_cursos_curso.controllers;

import com.espe.micro_cursos_curso.model.Usuario;
import com.espe.micro_cursos_curso.model.entity.Curso;
import com.espe.micro_cursos_curso.model.entity.CursoUsuario;
import com.espe.micro_cursos_curso.services.CursoService;
import feign.FeignException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/cursos")
public class CursoController {

    @Autowired
    private CursoService service;

    // Función reutilizable para validar el curso
    private ResponseEntity<?> validarCurso(BindingResult result) {
        if (result.hasErrors()) {
            Map<String, String> errores = new HashMap<>();
            result.getFieldErrors().forEach(
                    err -> errores.put(err.getField(), err.getDefaultMessage())
            );
            return ResponseEntity.badRequest().body(errores);
        }
        return null; // No hay errores, continuar con la operación
    }

    // Crear un curso
    @PostMapping
    public ResponseEntity<?> crear(@RequestBody @Valid Curso curso, BindingResult result) {
        // Validación reutilizable
        ResponseEntity<?> validationResponse = validarCurso(result);
        if (validationResponse != null) {
            return validationResponse; // Si hay errores, devolver respuesta con errores
        }

        // La fecha de creación se asignará automáticamente en el método @PrePersist
        Curso nuevoCurso = service.save(curso);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoCurso);
    }

    // Obtener todos los cursos
    @GetMapping
    public List<Curso> listar() {
        return service.findAll();
    }

    // Obtener un curso por ID
    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Long id) {
        Optional<Curso> curso = service.findById(id);
        if (curso.isPresent()) {
            return ResponseEntity.ok(curso.get());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Curso no encontrado");
    }

    // Actualizar un curso
    @PutMapping("/{id}")
    public ResponseEntity<?> actualizar(@RequestBody @Valid Curso curso, @PathVariable Long id, BindingResult result) {
        // Validación reutilizable
        ResponseEntity<?> validationResponse = validarCurso(result);
        if (validationResponse != null) {
            return validationResponse; // Si hay errores, devolver respuesta con errores
        }

        Optional<Curso> cursoExistente = service.findById(id);
        if (cursoExistente.isPresent()) {
            Curso cursoActualizado = cursoExistente.get();
            cursoActualizado.setNombre(curso.getNombre());
            cursoActualizado.setDescripcion(curso.getDescripcion());
            cursoActualizado.setCreditos(curso.getCreditos());
            // La fecha de creación no se modifica porque está configurada como "updatable = false"
            return ResponseEntity.ok(service.save(cursoActualizado));
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Curso no encontrado");
    }

    // Eliminar un curso
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) {
        Optional<Curso> curso = service.findById(id);
        if (curso.isPresent()) {
            service.deleteById(id);
            return ResponseEntity.ok("Curso eliminado correctamente");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Curso no encontrado");
    }

    @PutMapping("/asignar-usuario/{cursoId}")
    public ResponseEntity<?> asignarUsuario(@PathVariable Long cursoId, @RequestBody Usuario usuario) {
        Optional<Usuario> o;
        try {
            o = service.addUsuario(usuario, cursoId);
        } catch (FeignException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("mensaje",
                    "No Existe Usuario por el id o error en la comunicación: " + e.getMessage()));
        }
        if (o.isPresent()) {
            return ResponseEntity.status(HttpStatus.CREATED).body(o.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/{cursoId}/matricular/{usuarioId}")
    public ResponseEntity<?> matricularUsuario(@PathVariable Long cursoId, @PathVariable Long usuarioId) {
        Optional<Curso> cursoOpt = service.findById(cursoId);
        if (cursoOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Curso no encontrado");
        }
        Curso curso = cursoOpt.get();

        try {
            // Validar si el usuario existe en el microservicio estudiantes
            Optional<Usuario> usuarioOpt = service.findUsuarioById(usuarioId);
            if (usuarioOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado en el sistema de estudiantes");
            }

            Usuario usuario = usuarioOpt.get();
            CursoUsuario cursoUsuario = new CursoUsuario();
            cursoUsuario.setUsuarioId(usuario.getId());

            // Agregar el usuario al curso
            curso.addCursoUsuario(cursoUsuario);
            service.save(curso);

            return ResponseEntity.status(HttpStatus.CREATED).body("Usuario matriculado exitosamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocurrió un error al matricular al usuario");
        }
    }

    @GetMapping("/{cursoId}/usuarios")
    public ResponseEntity<?> listarUsuariosMatriculados(@PathVariable Long cursoId) {
        Optional<Curso> cursoOpt = service.findById(cursoId);
        if (cursoOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Curso no encontrado");
        }
        Curso curso = cursoOpt.get();

        List<Usuario> usuarios = new ArrayList<>();
        curso.getCursoUsuarios().forEach(cursoUsuario -> {
            try {
                Optional<Usuario> usuarioOpt = service.findUsuarioById(cursoUsuario.getUsuarioId());
                usuarioOpt.ifPresent(usuarios::add); // Agregar usuario si está presente
            } catch (Exception e) {
                // Manejar excepciones específicas según sea necesario
            }
        });

        return ResponseEntity.ok(usuarios);
    }



    @DeleteMapping("/{cursoId}/desmatricular/{usuarioId}")
    public ResponseEntity<?> desmatricularUsuario(@PathVariable Long cursoId, @PathVariable Long usuarioId) {
        Optional<Curso> cursoOpt = service.findById(cursoId);
        if (cursoOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Curso no encontrado");
        }
        Curso curso = cursoOpt.get();

        CursoUsuario cursoUsuario = new CursoUsuario();
        cursoUsuario.setUsuarioId(usuarioId);

        if (curso.getCursoUsuarios().contains(cursoUsuario)) {
            curso.removeCursoUsuario(cursoUsuario);
            service.save(curso);
            return ResponseEntity.ok("Usuario desmatriculado exitosamente");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("El usuario no está matriculado en este curso");
    }

}
