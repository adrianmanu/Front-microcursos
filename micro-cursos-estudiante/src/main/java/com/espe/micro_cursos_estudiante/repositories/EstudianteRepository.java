package com.espe.micro_cursos_estudiante.repositories;

import com.espe.micro_cursos_estudiante.model.entity.Estudiante;
import org.springframework.data.repository.CrudRepository;

public interface EstudianteRepository extends CrudRepository<Estudiante, Long> {

}