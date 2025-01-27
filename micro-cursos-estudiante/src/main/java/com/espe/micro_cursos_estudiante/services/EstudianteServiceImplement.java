package com.espe.micro_cursos_estudiante.services;

import com.espe.micro_cursos_estudiante.model.entity.Estudiante;
import com.espe.micro_cursos_estudiante.repositories.EstudianteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EstudianteServiceImplement implements EstudianteService {
    @Autowired
    private EstudianteRepository repository;
    @Override
    public List<Estudiante> findAll() {
        return (List<Estudiante>) repository.findAll();
    }
    @Override
    public Optional<Estudiante> findById(Long id) {
        return repository.findById(id);
    }
    @Override
    public Estudiante save(Estudiante estudiante) {
        return repository.save(estudiante);
    }
    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}