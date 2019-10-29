package com.petssocial.pets2.security.filters;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.petssocial.pets2.models.User;
import com.petssocial.pets2.security.services.UserService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;

public class LoginCustomFilterThatCreateToken extends AbstractAuthenticationProcessingFilter {


    private UserService userDetailsService;
    public LoginCustomFilterThatCreateToken(String defaultFilterProcessesUrl, AuthenticationManager manager,UserService userDetailsService) {
        super(new AntPathRequestMatcher(defaultFilterProcessesUrl));
        setAuthenticationManager(manager);
        this.userDetailsService = userDetailsService;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws AuthenticationException, IOException {
        System.out.println("Its working");
        User user = new ObjectMapper()
                .readValue(httpServletRequest.getInputStream(),
                        User.class);
        System.out.println(user);
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
        System.out.println("yes");
        UserDetails userDetails = userDetailsService.loadUserByUsername(authResult.getName());
        String jwt_token = userDetails.getUsername() + " ";
        for (GrantedAuthority authority : userDetails.getAuthorities()) {
             jwt_token += authority.getAuthority();
        }
        System.out.println(jwt_token);
        String token = Jwts.builder()
                .setSubject(jwt_token)
                .signWith(SignatureAlgorithm.HS512, "test".getBytes())
                //.setExpiration(new Date(System.currentTimeMillis() + 999999999))
                .compact();
        System.out.println(token);
        //send token to user
        response.addHeader("Authorization", "Bearer " + token);
    }
}
