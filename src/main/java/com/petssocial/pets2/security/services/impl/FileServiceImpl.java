package com.petssocial.pets2.security.services.impl;

import com.petssocial.pets2.security.services.FileService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Service
public class FileServiceImpl implements FileService {

    @Override
    public void storeFile(MultipartFile file) throws IOException {
        file.getOriginalFilename();
        String path = "D:" + File.separator + "Images" + File.separator + file.getOriginalFilename();
        file.transferTo(new File(path + file.getOriginalFilename()));
    }
}
