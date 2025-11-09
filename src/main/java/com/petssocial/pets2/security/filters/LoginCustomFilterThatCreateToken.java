package com.petssocial.pets2.security.filters;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.petssocial.pets2.models.User;
import com.petssocial.pets2.security.jwt.JwtTokenProvider;
import com.petssocial.pets2.security.services.UserService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.RequestMatcher;

import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;

public class LoginCustomFilterThatCreateToken extends AbstractAuthenticationProcessingFilter {


    private final UserService userDetailsService;
    private final JwtTokenProvider tokenProvider;

    public LoginCustomFilterThatCreateToken(String defaultFilterProcessesUrl, AuthenticationManager manager, UserService userDetailsService, JwtTokenProvider tokenProvider) {
        super((RequestMatcher) request -> defaultFilterProcessesUrl.equals(request.getServletPath()) && "POST".equalsIgnoreCase(request.getMethod()));
        setAuthenticationManager(manager);
        this.userDetailsService = userDetailsService;
        this.tokenProvider = tokenProvider;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws AuthenticationException, IOException {
        User user = new ObjectMapper()
                .readValue(httpServletRequest.getInputStream(),
                        User.class);
        return getAuthenticationManager().authenticate(
                new UsernamePasswordAuthenticationToken(
                        user.getUsername(),
                        user.getPassword(),
                        Collections.emptyList())
        );
    }

    @Override
    protected void successfulAuthentication(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain chain,
            Authentication authResult) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(authResult.getName());

        String token = tokenProvider.createToken(userDetails);
        //send token to user
        response.addHeader("Authorization", "Bearer " + token);
    }
}
