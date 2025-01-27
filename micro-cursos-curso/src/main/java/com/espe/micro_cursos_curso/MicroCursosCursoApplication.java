package com.espe.micro_cursos_curso;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients // Asegúrate de que esta anotación esté presente

public class MicroCursosCursoApplication {
	public static void main(String[] args) {
		SpringApplication.run(MicroCursosCursoApplication.class, args);
	}
}
