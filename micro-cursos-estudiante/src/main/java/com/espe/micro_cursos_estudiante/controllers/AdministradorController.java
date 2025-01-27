package com.espe.micro_cursos_estudiante.controllers;

import com.espe.micro_cursos_estudiante.model.entity.Administrador;
import com.espe.micro_cursos_estudiante.services.AdministradorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/administradores")
public class AdministradorController {

    @Autowired
    private AdministradorService service;

    // Crear un administrador
    @PostMapping
    public ResponseEntity<?> crear(@RequestBody Administrador administrador) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(administrador));
    }

    // Buscar administrador por nombre de usuario y verificar contraseña
    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticate(@RequestBody Administrador administrador) {
        Optional<Administrador> existingAdmin = service.findByUsername(administrador.getUsername());
        if (existingAdmin.isPresent()) {
            // Compara la contraseña
            boolean passwordMatches = administrador.getPassword().equals(existingAdmin.get().getPassword());
            if (passwordMatches) {
                return ResponseEntity.ok(existingAdmin.get());
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Contraseña incorrecta");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Administrador no encontrado");
        }
    }
}
