package com.attendai;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.attendai.entity.User;
import com.attendai.repository.UserRepository;

@SpringBootApplication
public class AttendaiApplication {
    public static void main(String[] args) {
        // OpenCV is loaded automatically by Bytedeco
        SpringApplication.run(AttendaiApplication.class, args);
    }

    @Bean
    public CommandLineRunner initUser(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            // Seed Admin User
            User admin = userRepository.findByEmail("admin@attendai.com").orElse(new User());
            admin.setEmail("admin@attendai.com");
            admin.setName("System Admin");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole("ADMIN");
            userRepository.save(admin);

            // Seed Faculty User
            User faculty = userRepository.findByEmail("faculty@attendai.com").orElse(new User());
            faculty.setEmail("faculty@attendai.com");
            faculty.setName("Prof. Sarah Jenkins");
            faculty.setPassword(passwordEncoder.encode("admin123"));
            faculty.setRole("FACULTY");
            userRepository.save(faculty);

            System.out.println("===> ADMIN & FACULTY SEEDED SUCCESSFULLY <===");
        };
    }
}
