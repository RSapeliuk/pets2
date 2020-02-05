package com.petssocial.pets2.security.services.impl;

import com.petssocial.pets2.security.services.FileService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

@Slf4j
@Service
public class FileServiceImpl implements FileService {
    @Value("${upload.path:#{null}}")
    private String uploadPath;

    public String storeFile(MultipartFile file) throws IOException {
        BufferedImage image = null;

        try {
            image = ImageIO.read(file.getInputStream());
        } catch (IOException e) {
            log.error(e.getMessage());
        }
        if (image != null) {
            String path = System.getProperty("user.home") + File.separator + uploadPath + File.separator + file.getOriginalFilename();
            Path uploadFolder = Paths.get(path);
            file.transferTo(uploadFolder);
            return file.getOriginalFilename();
        } else {
            return null;
        }
    }
}
