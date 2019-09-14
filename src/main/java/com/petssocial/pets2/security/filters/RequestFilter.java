//package com.petssocial.pets2.security.filters;
//
//import org.hibernate.Filter;
//import org.springframework.stereotype.Component;
//import org.springframework.web.filter.GenericFilterBean;
//
//import javax.servlet.FilterChain;
//import javax.servlet.ServletRequest;
//import javax.servlet.ServletResponse;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//
//
//@Component
//
//public class RequestFilter extends GenericFilterBean {
//
//    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) {
//        HttpServletResponse response = (HttpServletResponse) res;
//        HttpServletRequest request = (HttpServletRequest) req;
//
//        response.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
//        response.setHeader("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS, DELETE");
//        response.setHeader("Access-Control-Allow-Headers", "x-requested-with");
//        response.setHeader("Access-Control-Max-Age", "3600");
//        response.setHeader("Access-Control-Allow-Credentials", "true");
//        response.setHeader("Access-Control-Allow-Headers", "Authorization, content-type, xsrf-token");
//
//        if (!(request.getMethod().equalsIgnoreCase("OPTIONS"))) {
//            try {
//                chain.doFilter(req, res);
//            } catch(Exception e) {
//                e.printStackTrace();
//            }
//        } else {
//            System.out.println("Pre-flight");
//            response.setHeader("Access-Control-Allow-Methods", "POST,GET,DELETE");
//            response.setHeader("Access-Control-Max-Age", "3600");
//            response.setHeader("Access-Control-Allow-Headers", "authorization, content-type," +
//                    "access-control-request-headers,access-control-request-method,accept,origin,authorization,x-requested-with");
//            response.addHeader("Access-Control-Expose-Headers", "Authorization");
//            response.setStatus(HttpServletResponse.SC_OK);
//        }
//
//    }
//}
