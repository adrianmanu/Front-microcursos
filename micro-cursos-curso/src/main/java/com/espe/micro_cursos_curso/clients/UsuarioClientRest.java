package com.espe.micro_cursos_curso.clients;

import com.espe.micro_cursos_curso.model.Usuario;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "micro-cursos-estudiante", url = "http://localhost:8082/api/estudiantes")
public interface UsuarioClientRest {

    // Método para obtener un usuario por su ID
    @GetMapping("/{id}")
    Usuario findById(@PathVariable("id") long id);
}

