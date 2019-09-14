package com.petssocial.pets2.security.filters;

import io.jsonwebtoken.Jwts;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;

import java.util.List;

@Component
public class FilterThatCheckTokenOnEveryRequest extends GenericFilterBean {
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        Authentication authenticate = null;
        HttpServletResponse response = (HttpServletResponse) servletResponse;
        HttpServletRequest request = (HttpServletRequest) servletRequest;


        String token = request.getHeader("Authorization");
        if (token != null) {
            String decodedTicket = Jwts.parser().setSigningKey("test".getBytes())
                    .parseClaimsJws(token)
                    .getBody().getSubject();
            String[] array = decodedTicket.split(" ");
            List<GrantedAuthority> authorities = new ArrayList<>();
            authorities.add(new SimpleGrantedAuthority(array[1]));
            authenticate = new UsernamePasswordAuthenticationToken(decodedTicket, null, authorities);
            System.out.println(decodedTicket);

        }
        SecurityContextHolder.getContext().setAuthentication(authenticate);
        filterChain.doFilter(servletRequest, servletResponse);

    }
}
