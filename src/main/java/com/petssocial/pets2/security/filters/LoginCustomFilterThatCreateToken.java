package com.petssocial.pets2.security.filters;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.petssocial.pets2.dao.UserDAO;
import com.petssocial.pets2.models.User;
import com.petssocial.pets2.security.services.UserService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;
import java.util.Date;

public class LoginCustomFilterThatCreateToken extends AbstractAuthenticationProcessingFilter {

    private AuthenticationManager authenticationManager;
    @Autowired
    private UserService userService;
    @Autowired
    private UserDAO userDAO;
    private UserService userDetailsService;
    public LoginCustomFilterThatCreateToken(String defaultFilterProcessesUrl, AuthenticationManager manager,UserService userDetailsService) {
        super(defaultFilterProcessesUrl);
        this.authenticationManager = manager;
        this.userDetailsService = userDetailsService;


    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws AuthenticationException, IOException, ServletException {
        System.out.println("Its working");
        User user = new ObjectMapper().readValue(httpServletRequest.getInputStream(), User.class);
        Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(),
                user.getPassword(),
                Collections.emptyList()));
        System.out.println(authenticate.isAuthenticated());
        return authenticate;
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        System.out.println("yes");
        UserDetails userDetails = userDetailsService.loadUserByUsername(authResult.getName());
        String jwt_token = userDetails.getUsername() + " ";
        for (GrantedAuthority authority : userDetails.getAuthorities()) {
             jwt_token += authority.getAuthority();
        }
        String token = Jwts.builder()
                .setSubject(jwt_token)
                .signWith(SignatureAlgorithm.HS512, "test".getBytes())
                .setExpiration(new Date(System.currentTimeMillis() + 200000))
                .compact();
        System.out.println(token);
        //send token to user
        response.addHeader("Authorization", token);
    }
}
