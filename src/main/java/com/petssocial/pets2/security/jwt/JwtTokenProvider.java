package com.petssocial.pets2.security.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;
import java.security.Key;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class JwtTokenProvider {

    @Value("${jwt.secret}")
    private String secret;

    // default token validity 1 hour
    private static final long DEFAULT_VALIDITY = 3600_000L;

    private Key signingKey;

    public JwtTokenProvider() {
        // default constructor for Spring
    }

    // Test-friendly constructor: allows creating a provider outside of Spring tests
    public JwtTokenProvider(String secret) {
        this.secret = secret;
        init();
    }

    @PostConstruct
    public void init() {
        if (secret == null || secret.isEmpty()) {
            throw new IllegalStateException("jwt.secret must be configured and non-empty");
        }
        byte[] keyBytes = secret.getBytes();
        if (keyBytes.length < 32) {
            throw new IllegalStateException("jwt.secret must be at least 32 bytes (256 bits) for HS algorithms");
        }
        this.signingKey = Keys.hmacShaKeyFor(keyBytes);
    }

    @SuppressWarnings("deprecation")
    public String createToken(UserDetails userDetails) {
        return createToken(userDetails, DEFAULT_VALIDITY);
    }

    @SuppressWarnings("deprecation")
    public String createToken(UserDetails userDetails, long validityMillis) {
        Date now = new Date();
        Date expiry = validityMillis <= 0 ? new Date(now.getTime() - 1000) : new Date(now.getTime() + validityMillis);
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());
        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .claim("roles", roles)
                .setIssuedAt(now)
                .setExpiration(expiry)
                .signWith(signingKey)
                .compact();
    }

    public Authentication getAuthentication(String token) {
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(signingKey)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
            String username = claims.getSubject();
            Object rolesObj = claims.get("roles");
            Collection<? extends GrantedAuthority> authorities = new ArrayList<>();
            if (rolesObj instanceof List) {
                List<?> list = (List<?>) rolesObj;
                List<GrantedAuthority> auths = new ArrayList<>();
                for (Object role : list) {
                    if (role != null) {
                        auths.add(new SimpleGrantedAuthority(role.toString()));
                    }
                }
                authorities = auths;
            }
            if (username != null) {
                return new UsernamePasswordAuthenticationToken(username, null, authorities);
            }
        } catch (JwtException | IllegalArgumentException e) {
            // invalid token
        }
        return null;
    }

    // expose key for tests (not recommended for prod but useful for unit tests)
    public Key getSigningKey() {
        return signingKey;
    }
}
