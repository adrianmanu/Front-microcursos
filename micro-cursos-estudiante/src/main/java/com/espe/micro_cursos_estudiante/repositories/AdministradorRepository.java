package com.espe.micro_cursos_estudiante.repositories;

import com.espe.micro_cursos_estudiante.model.entity.Administrador;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface AdministradorRepository extends CrudRepository<Administrador, Long> {

    // Agregar el método para buscar por username
    Optional<Administrador> findByUsername(String username);
}
