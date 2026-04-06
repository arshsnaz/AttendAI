package com.attendai.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Set;
import java.util.UUID;

@Service
public class FileStorageService {

    private static final Set<String> ALLOWED_EXTENSIONS = Set.of("jpg", "jpeg", "png", "gif", "webp", "bmp");

    private final Path studentImageDir;
    private final String publicImageBasePath;

    public FileStorageService(@Value("${app.upload.student-dir:uploads/students}") String studentImageDir) {
        this.studentImageDir = Paths.get(studentImageDir).toAbsolutePath().normalize();
        this.publicImageBasePath = "/uploads/students";
    }

    public String storeStudentImage(MultipartFile image) {
        if (image == null || image.isEmpty()) {
            throw new IllegalArgumentException("Image file is required");
        }

        String contentType = image.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            throw new IllegalArgumentException("Only image files are allowed");
        }

        String extension = resolveExtension(image.getOriginalFilename());
        String fileName = UUID.randomUUID() + "." + extension;

        try {
            Files.createDirectories(studentImageDir);
            Path targetPath = studentImageDir.resolve(fileName);
            Files.copy(image.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);
            return publicImageBasePath + "/" + fileName;
        } catch (IOException ex) {
            throw new RuntimeException("Failed to store image", ex);
        }
    }

    private String resolveExtension(String originalFilename) {
        String extension = StringUtils.getFilenameExtension(originalFilename);
        if (extension == null || extension.isBlank()) {
            return "jpg";
        }

        String normalized = extension.toLowerCase();
        if (!ALLOWED_EXTENSIONS.contains(normalized)) {
            throw new IllegalArgumentException("Unsupported image file extension");
        }

        return normalized;
    }
}
