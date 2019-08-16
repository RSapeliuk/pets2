package com.petssocial.pets2.security.filters;

import io.jsonwebtoken.Jwts;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Collections;

public class FilterThatCheckTokenOnEveryRequest extends GenericFilterBean {
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        Authentication authenticate = null;
        HttpServletRequest httpServletRequest = (HttpServletRequest) servletRequest;
        String token = httpServletRequest.getHeader("token");
        if (token != null) {
            String decodedTicket = Jwts.parser().setSigningKey("test".getBytes())
                    .parseClaimsJws(token)
                    .getBody().getSubject();
            authenticate = new UsernamePasswordAuthenticationToken(decodedTicket,null, Collections.emptyList());
        }
        SecurityContextHolder.getContext().setAuthentication(authenticate);
        filterChain.doFilter(servletRequest, servletResponse);
    }
}
