package com.espe.micro_cursos_estudiante.controllers;

import com.espe.micro_cursos_estudiante.model.entity.Estudiante;
import com.espe.micro_cursos_estudiante.services.EstudianteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/estudiantes")
public class EstudianteController {

    @Autowired
    private EstudianteService service;

    @PostMapping
    public ResponseEntity<?> crear(@RequestBody Estudiante estudiante) {
        try {
            Estudiante nuevoEstudiante = service.save(estudiante);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevoEstudiante);
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("El correo electrónico ya está en uso");
        }
    }

    // Obtener todos los estudiantes
    @GetMapping
    public List<Estudiante> listar() {
        return service.findAll();
    }

    // Obtener un estudiante por ID
    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Long id) {
        Optional<Estudiante> estudiante = service.findById(id);
        if (estudiante.isPresent()) {
            return ResponseEntity.ok(estudiante.get());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Estudiante no encontrado");
    }

    // Actualizar un estudiante
    @PutMapping("/{id}")
    public ResponseEntity<?> actualizar(@RequestBody Estudiante estudiante, @PathVariable Long id) {
        Optional<Estudiante> estudianteExistente = service.findById(id);
        if (estudianteExistente.isPresent()) {
            Estudiante estudianteActualizado = estudianteExistente.get();
            estudianteActualizado.setNombre(estudiante.getNombre());
            estudianteActualizado.setApellido(estudiante.getApellido());
            estudianteActualizado.setEmail(estudiante.getEmail());
            estudianteActualizado.setFechaNacimiento(estudiante.getFechaNacimiento());
            estudianteActualizado.setTelefono(estudiante.getTelefono());
            return ResponseEntity.ok(service.save(estudianteActualizado));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Estudiante no encontrado");
    }

    // Eliminar un estudiante
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) {
        Optional<Estudiante> estudiante = service.findById(id);
        if (estudiante.isPresent()) {
            service.deleteById(id);
            return ResponseEntity.ok("Estudiante eliminado correctamente");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Estudiante no encontrado");
    }
}