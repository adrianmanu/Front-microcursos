package com.espe.micro_cursos_estudiante.services;

import com.espe.micro_cursos_estudiante.model.entity.Estudiante;

import java.util.List;
import java.util.Optional;

public interface EstudianteService {
    List<Estudiante> findAll();
    Optional<Estudiante> findById(Long id);
    Estudiante save(Estudiante estudiante);
    void deleteById(Long id);
}