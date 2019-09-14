package com.petssocial.pets2.security.services;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public interface FileService {
    void storeFile(MultipartFile file) throws IOException;
}
