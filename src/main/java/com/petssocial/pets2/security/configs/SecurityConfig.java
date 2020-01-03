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
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
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
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

import java.util.Arrays;
import java.util.Collections;

@Configuration
@EnableWebSecurity
@EnableWebSocketMessageBroker
public class SecurityConfig extends WebSecurityConfigurerAdapter implements WebSocketMessageBrokerConfigurer {

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

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
    }

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
                .antMatchers("/socket/**").permitAll()
                .antMatchers(HttpMethod.POST, "/user/**").hasRole("USER")
                .antMatchers(HttpMethod.GET, "/user/**").hasRole("USER")
                .antMatchers(HttpMethod.GET, "/admin/**").hasRole("ADMIN")
                .antMatchers(HttpMethod.POST, "/admin/**").hasRole("ADMIN")
                .antMatchers(HttpMethod.POST, "/addPhoto/**").hasRole("USER")
                .antMatchers(HttpMethod.POST, "/addAvatar/**").permitAll()
                .antMatchers(HttpMethod.POST, "/addLocation/**").permitAll()
                .antMatchers(HttpMethod.POST, "/addPetPhoto/**").hasRole("USER")
                .antMatchers(HttpMethod.GET, "/post/**").permitAll()
                .antMatchers(HttpMethod.GET, "/images/**").permitAll()
                .antMatchers(HttpMethod.GET, "/users").hasRole("ADMIN")
                .antMatchers(HttpMethod.GET, "/posts").permitAll()
                .antMatchers(HttpMethod.GET, "/getCity/**").permitAll()
                .antMatchers(HttpMethod.GET, "/getDistricts/**").permitAll()
                .antMatchers(HttpMethod.GET, "/authUser").permitAll()
                .antMatchers(HttpMethod.PUT, "/edit/**").hasRole("USER")
                .antMatchers(HttpMethod.PUT, "/rating/**").permitAll()
                .antMatchers(HttpMethod.PUT, "/updatePet/**").hasRole("USER")
                .antMatchers( "/socket").hasRole("USER")
                .anyRequest().authenticated()
                .and()
                .addFilterBefore(new FilterThatCheckTokenOnEveryRequest(), UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(new LoginCustomFilterThatCreateToken("/login", authenticationManager(), userDetailsService), UsernamePasswordAuthenticationFilter.class);
    }
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.addAllowedHeader("*");
        configuration.setAllowedMethods(Arrays.asList(
                HttpMethod.GET.name(),
                HttpMethod.HEAD.name(),
                HttpMethod.POST.name(),
                HttpMethod.PUT.name(),
                HttpMethod.DELETE.name(),
                HttpMethod.TRACE.name(),
                HttpMethod.OPTIONS.name()));
        configuration.addExposedHeader("Authorization");
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/socket")
                .setAllowedOrigins("*")
                .withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.setApplicationDestinationPrefixes("/socket-subscriber")
                .enableSimpleBroker("/socket-publisher");
    }
}




