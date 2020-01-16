package com.petssocial.pets2.security.configs;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.File;

@Configuration
public class WebImageConfig implements WebMvcConfigurer {

    @Value("${upload.path:#{null}}")
    private String uploadPath;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/images/**")
               .addResourceLocations("file://" + System.getProperty("user.home") + File.separator + "images" + File.separator);
    }
}
