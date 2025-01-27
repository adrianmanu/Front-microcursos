package com.espe.micro_cursos_curso.services;

import com.espe.micro_cursos_curso.model.Usuario;
import com.espe.micro_cursos_curso.model.entity.Curso;

import java.util.List;
import java.util.Optional;

public interface CursoService {
    List<Curso> findAll(); // Obtener todos los cursos
    Optional<Curso> findById(Long id); // Obtener un curso por su ID
    Curso save(Curso curso); // Guardar un curso
    void deleteById(Long id); // Eliminar un curso por su ID

    Optional<Usuario> addUsuario(Usuario usuario, Long cursoId); // Agregar un usuario a un curso
    Optional<Usuario> findUsuarioById(Long usuarioId); // Buscar un usuario por su ID
}
