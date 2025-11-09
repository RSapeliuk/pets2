package com.petssocial.pets2.security.jwt;

import com.petssocial.pets2.security.filters.FilterThatCheckTokenOnEveryRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockFilterChain;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Collections;

import static org.junit.jupiter.api.Assertions.*;

public class JwtFilterIntegrationTest {

    private JwtTokenProvider tokenProvider;
    private FilterThatCheckTokenOnEveryRequest filter;

    private static final String TEST_SECRET = "abcdefghijklmnopqrstuvwxyz123456"; // 32+ bytes

    @BeforeEach
    public void setUp() {
        tokenProvider = new JwtTokenProvider(TEST_SECRET);
        filter = new FilterThatCheckTokenOnEveryRequest(tokenProvider);
        // clear security context
        SecurityContextHolder.clearContext();
    }

    @Test
    public void validToken_authenticates() throws Exception {
        // build a fake UserDetails via a simple org.springframework.security.core.userdetails.User
        org.springframework.security.core.userdetails.User userDetails =
                new org.springframework.security.core.userdetails.User("alice", "", Collections.singleton(() -> "ROLE_USER"));
        String token = tokenProvider.createToken(userDetails, 3600_000L);

        MockHttpServletRequest req = new MockHttpServletRequest();
        req.addHeader("Authorization", "Bearer " + token);
        MockHttpServletResponse res = new MockHttpServletResponse();
        MockFilterChain chain = new MockFilterChain();

        filter.doFilter(req, res, chain);
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        assertNotNull(auth);
        assertEquals("alice", auth.getName());
        assertTrue(auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_USER")));
    }

    @Test
    public void expiredToken_notAuthenticated() throws Exception {
        org.springframework.security.core.userdetails.User userDetails =
                new org.springframework.security.core.userdetails.User("bob", "", Collections.singleton(() -> "ROLE_USER"));
        String token = tokenProvider.createToken(userDetails, -1000L); // already expired

        MockHttpServletRequest req = new MockHttpServletRequest();
        req.addHeader("Authorization", "Bearer " + token);
        MockHttpServletResponse res = new MockHttpServletResponse();
        MockFilterChain chain = new MockFilterChain();

        filter.doFilter(req, res, chain);
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        assertNull(auth);
    }

    @Test
    public void wrongSignature_notAuthenticated() throws Exception {
        // create a token with a different key
        JwtTokenProvider otherProvider = new JwtTokenProvider("different-key-that-is-long-enough-12345");
        org.springframework.security.core.userdetails.User userDetails =
                new org.springframework.security.core.userdetails.User("eve", "", Collections.singleton(() -> "ROLE_USER"));
        String token = otherProvider.createToken(userDetails, 3600_000L);

        MockHttpServletRequest req = new MockHttpServletRequest();
        req.addHeader("Authorization", "Bearer " + token);
        MockHttpServletResponse res = new MockHttpServletResponse();
        MockFilterChain chain = new MockFilterChain();

        filter.doFilter(req, res, chain);
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        assertNull(auth);
    }
}
