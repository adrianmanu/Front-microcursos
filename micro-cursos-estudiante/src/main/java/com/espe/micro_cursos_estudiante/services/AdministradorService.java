package com.espe.micro_cursos_estudiante.services;

import com.espe.micro_cursos_estudiante.model.entity.Administrador;
import java.util.Optional;

public interface AdministradorService {

    Administrador save(Administrador administrador);

    Optional<Administrador> findById(Long id);

    // Agregar el método para buscar por username
    Optional<Administrador> findByUsername(String username);
}
