package com.petssocial.pets2.security.configs;

import com.petssocial.pets2.security.filters.FilterThatCheckTokenOnEveryRequest;
import com.petssocial.pets2.security.filters.LoginCustomFilterThatCreateToken;

import com.petssocial.pets2.security.services.FileService;
import com.petssocial.pets2.security.services.PetService;
import com.petssocial.pets2.security.services.PostService;
import com.petssocial.pets2.security.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;


import java.util.Arrays;

@Configuration
//@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    @Qualifier("userServiceImpl")
    private UserService userDetailsService;

    @Autowired
    @Qualifier("postServiceImpl")
    private PostService postService;

    @Autowired
    @Qualifier("fileServiceImpl")
    private FileService fileService;

    @Autowired
    @Qualifier("petServiceImpl")
    private PetService petService;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors()
                .and()
                .csrf()
                .disable()
                .authorizeRequests()
                .antMatchers("/").permitAll()
                .antMatchers(HttpMethod.POST, "/login").permitAll()
                .antMatchers(HttpMethod.POST, "/signup").permitAll()
                .antMatchers(HttpMethod.POST, "/user/**").permitAll()//.hasRole("USER")
                .antMatchers(HttpMethod.GET, "/user/**").permitAll()//.hasRole("USER")
                .antMatchers(HttpMethod.POST, "/addPhoto/**").permitAll()//hasRole("USER")
                .antMatchers(HttpMethod.POST, "/addAvatar/**").permitAll()//hasRole("USER")
                .antMatchers(HttpMethod.POST, "/addLocation/**").permitAll()//hasRole("USER")
                .antMatchers(HttpMethod.POST, "/addPetPhoto/**").permitAll()//hasRole("USER")
                .antMatchers(HttpMethod.GET, "/post/**").permitAll()
                .antMatchers(HttpMethod.GET, "/images/**").permitAll()
                .antMatchers(HttpMethod.GET, "/users").hasRole("USER")
                .antMatchers(HttpMethod.GET, "/posts").permitAll()
                .antMatchers(HttpMethod.GET, "/authUser").permitAll()
                .antMatchers(HttpMethod.PUT, "/edit/**").permitAll()
                .antMatchers(HttpMethod.PUT, "/rating/**").permitAll()
                .antMatchers(HttpMethod.PUT, "/updatePet/**").permitAll()
                .antMatchers( "/socket").permitAll()
                .anyRequest().authenticated()
                .and()
                .addFilterBefore(new FilterThatCheckTokenOnEveryRequest(), UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(new LoginCustomFilterThatCreateToken("/login", authenticationManager(), userDetailsService), UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200"));
        configuration.addAllowedHeader("*");
        configuration.setAllowedMethods(Arrays.asList(
                HttpMethod.GET.name(),
                HttpMethod.HEAD.name(),
                HttpMethod.POST.name(),
                HttpMethod.PUT.name(),
                HttpMethod.DELETE.name(),
                HttpMethod.OPTIONS.name()));
        configuration.addExposedHeader("Authorization");
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        source.registerCorsConfiguration("/", configuration);
        source.registerCorsConfiguration("/login", configuration);
        return source;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
    }

}



