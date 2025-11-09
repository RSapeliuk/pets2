package com.petssocial.pets2.security.configs;

import com.petssocial.pets2.security.filters.FilterThatCheckTokenOnEveryRequest;
import com.petssocial.pets2.security.filters.LoginCustomFilterThatCreateToken;
import com.petssocial.pets2.security.jwt.JwtTokenProvider;
import com.petssocial.pets2.security.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
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
public class SecurityConfig implements WebSocketMessageBrokerConfigurer {

    @Autowired
    @Qualifier("userServiceImpl")
    private UserService userDetailsService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public FilterThatCheckTokenOnEveryRequest tokenFilter() {
        return new FilterThatCheckTokenOnEveryRequest(jwtTokenProvider);
    }

    // Rely on Spring Boot auto-configuration for AuthenticationManager and DaoAuthenticationProvider

    @Bean
    public LoginCustomFilterThatCreateToken loginFilter(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        AuthenticationManager authenticationManager = authenticationConfiguration.getAuthenticationManager();
        return new LoginCustomFilterThatCreateToken("/login", authenticationManager, userDetailsService, jwtTokenProvider);
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http,
                                                   FilterThatCheckTokenOnEveryRequest tokenFilter,
                                                   LoginCustomFilterThatCreateToken loginFilter) throws Exception {
        http.cors(Customizer.withDefaults())
            .csrf(AbstractHttpConfigurer::disable)
            .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/").permitAll()
                .requestMatchers(HttpMethod.POST, "/login").permitAll()
                .requestMatchers(HttpMethod.POST, "/signup").permitAll()
                .requestMatchers("/user/**").hasRole("USER")
                .requestMatchers("/admin/**").hasRole("ADMIN")
                .requestMatchers("/addAvatar/**").permitAll()
                .requestMatchers("/post/**").permitAll()
                .requestMatchers("/images/**").permitAll()
                .requestMatchers("/posts").permitAll()
                .requestMatchers("/getCity/**").permitAll()
                .requestMatchers("/getDistricts/**").permitAll()
                .requestMatchers("/authUser").permitAll()
                .requestMatchers("/rating/**").permitAll()
                .requestMatchers("/ws/**").permitAll()
                .requestMatchers("/api/**").permitAll()
                .anyRequest().authenticated()
            );

        http.addFilterBefore(tokenFilter, UsernamePasswordAuthenticationFilter.class);
        http.addFilterBefore(loginFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
     }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Collections.singletonList("*"));
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
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> {};
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")
                .setAllowedOrigins("http://localhost:4200")
                .withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.setApplicationDestinationPrefixes("/app")
                .enableSimpleBroker("/topic");
    }
}
