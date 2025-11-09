package com.petssocial.pets2.security.filters;

import com.petssocial.pets2.security.jwt.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import java.io.IOException;


@Component
public class FilterThatCheckTokenOnEveryRequest extends GenericFilterBean {

    private final JwtTokenProvider tokenProvider;

    @Autowired
    public FilterThatCheckTokenOnEveryRequest(JwtTokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }

    @Override
    public void doFilter(ServletRequest servletRequest,
                         ServletResponse servletResponse,
                         FilterChain filterChain) throws IOException, ServletException {
        Authentication authentication = null;
        HttpServletRequest request = (HttpServletRequest) servletRequest;

        String token = request.getHeader("Authorization");
        if (token != null && !token.trim().isEmpty()) {
            String jwt = token.replaceFirst("(?i)^Bearer\\s+", "").trim();
            if (!jwt.isEmpty()) {
                authentication = tokenProvider.getAuthentication(jwt);
            }
        }
        SecurityContextHolder.getContext().setAuthentication(authentication);
        filterChain.doFilter(servletRequest, servletResponse);
    }
}
