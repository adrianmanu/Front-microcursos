package com.espe.micro_cursos_estudiante.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class WebConfig implements WebMvcConfigurer {

    // Configuración de CORS
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Permite todas las rutas
                .allowedOrigins("http://localhost:3000") // Permite peticiones solo de tu frontend
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Métodos permitidos
                .allowedHeaders("*");
    }

    // Configuración de seguridad
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Deshabilitar CSRF para evitar problemas con las solicitudes
                .authorizeHttpRequests(authz -> authz
                        .requestMatchers("/api/administradores/authenticate", "/api/administradores").permitAll() // Permitir login sin autenticación
                        .requestMatchers("/api/estudiantes", "/api/estudiantes/{id}").permitAll() // Permitir el acceso sin autenticación a los estudiantes
                        .anyRequest().authenticated() // Requiere autenticación para cualquier otra ruta
                )
                .httpBasic(withDefaults()) // Habilita autenticación básica
                .formLogin(withDefaults()); // Habilita formularios de login

        return http.build();
    }

    // Codificación de contraseñas
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
