package com.espe.micro_cursos_curso.services;

import com.espe.micro_cursos_curso.clients.UsuarioClientRest;
import com.espe.micro_cursos_curso.model.Usuario;
import com.espe.micro_cursos_curso.model.entity.Curso;
import com.espe.micro_cursos_curso.model.entity.CursoUsuario;
import com.espe.micro_cursos_curso.repositories.CursoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CursoServiceImplement implements CursoService {

    @Autowired
    private CursoRepository repository;

    @Autowired
    private UsuarioClientRest clientRest;

    @Override
    public List<Curso> findAll() {
        return (List<Curso>) repository.findAll();
    }

    @Override
    public Optional<Curso> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public Curso save(Curso curso) {
        return repository.save(curso);
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    @Override
    public Optional<Usuario> addUsuario(Usuario usuario, Long cursoId) {
        Optional<Curso> optionalCurso = repository.findById(cursoId);

        if (optionalCurso.isPresent()) {
            Curso curso = optionalCurso.get();

            // Verifica que el usuario existe en el microservicio de usuarios
            Usuario usuarioExistente = clientRest.findById(usuario.getId());
            if (usuarioExistente == null) {
                return Optional.empty(); // El usuario no existe
            }

            // Crea una relación entre el curso y el usuario
            CursoUsuario cursoUsuario = new CursoUsuario();
            cursoUsuario.setUsuarioId(usuarioExistente.getId());
            curso.addCursoUsuario(cursoUsuario);

            // Guarda los cambios en el curso
            repository.save(curso);
            return Optional.of(usuarioExistente);
        }

        return Optional.empty(); // El curso no fue encontrado
    }

    @Override
    public Optional<Usuario> findUsuarioById(Long usuarioId) {
        // Se consulta al microservicio de usuarios para obtener la información del usuario
        try {
            Usuario usuario = clientRest.findById(usuarioId);
            return Optional.ofNullable(usuario);
        } catch (Exception e) {
            return Optional.empty(); // Retorna vacío si no se encuentra el usuario o hay un error
        }
    }
}
