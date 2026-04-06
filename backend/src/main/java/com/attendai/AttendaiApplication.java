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
            User user = userRepository.findByEmail("admin@attendai.com").orElse(new User());
            user.setEmail("admin@attendai.com");
            user.setName("System Admin");
            user.setPassword(passwordEncoder.encode("admin123"));
            user.setRole("ADMIN");
            userRepository.save(user);
            System.out.println("===> ADMIN SEEDED SUCCESSFULLY <===");
        };
    }
}
