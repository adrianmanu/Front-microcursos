package com.espe.micro_cursos_estudiante.services;

import com.espe.micro_cursos_estudiante.model.entity.Administrador;
import com.espe.micro_cursos_estudiante.repositories.AdministradorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdministradorServiceImplement implements AdministradorService {

    @Autowired
    private AdministradorRepository repository;

    @Override
    public Administrador save(Administrador administrador) {
        // No se cifra la contraseña ahora
        return repository.save(administrador);
    }

    @Override
    public Optional<Administrador> findById(Long id) {
        return repository.findById(id); // Busca por id en el repositorio
    }

    @Override
    public Optional<Administrador> findByUsername(String username) {
        return repository.findByUsername(username); // Buscar por username en el repositorio
    }
}
