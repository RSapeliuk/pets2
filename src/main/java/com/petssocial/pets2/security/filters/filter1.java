//
//// if user without token (first attempt to login)
//public class CustomAuthenticationFilter extends AbstractAuthenticationProcessingFilter {
//
//    AuthenticationManager authenticationManager;
//
//    public CustomAuthenticationFilter(AuthenticationManager authenticationManager) {
//        super(new AntPathRequestMatcher("/loginURL","POST"));
//        this.authenticationManager = authenticationManager;
//    }
//
//    // на основе имеющихся в запросе данных наполнить объект индентификации
//    @Override
//    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
//        System.out.println("attempt");
//        try {
//            User user = new ObjectMapper().readValue(request.getInputStream(), User.class);
//            System.out.println(user);
////            System.out.println(request.getParameter("username"));
////            System.out.println(request.getParameter("password"));
//            System.out.println(user + "USER!!!!!!!!!!!!!");
//            if (user.getUsername().equals("user") && user.getPassword().equals("pass")) {
//
//                return new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword(), user.getRoles());
//            } else {
//                return null;
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//            throw new RuntimeException();
//        }
//
//    }
//
//    @Override
//    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
//        System.out.println(authResult + "!!!!!!!!!!!!!!!!!");
//    }
//}
//
//public class CustomAuthorizationFilter extends BasicAuthenticationFilter  {
//    public CustomAuthorizationFilter(AuthenticationManager authenticationManager) {
//        super(authenticationManager);
//    }
//
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
//        String dirtyToken = request.getHeader("token");
//        System.out.println(dirtyToken+ " token");
//        UsernamePasswordAuthenticationToken authenticationToken = null;
//        if (StringUtils.isEmpty(dirtyToken) || !dirtyToken.startsWith("yes")) {
//            chain.doFilter(request, response);
//            return;
//        } else {
//            String clearToken = dirtyToken.replace("yes ", "");
//            String username = clearToken.replace("name=", "");
//            // найти юзера по имени ... сформировать объект индентификации
//            authenticationToken = new UsernamePasswordAuthenticationToken(username, null, new ArrayList<>());
//        }
//        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
//        chain.doFilter(request, response);
//
//    }
//}
//
//@EnableWebSecurity
//@Configuration
//public class SecurityConfig extends WebSecurityConfigurerAdapter {
//
//    @Override
//    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//        auth.inMemoryAuthentication().withUser("user").password("{noop}pass").roles("ADMIN");
//    }
//
//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//        http
//                .authorizeRequests()
//                .anyRequest().permitAll()
////                .antMatchers(HttpMethod.POST, "/login", "/save").permitAll()
////                .antMatchers("/", "/home").permitAll()
////                .anyRequest().authenticated()
////                .antMatchers("/admin/**").hasRole("ADMIN")
//                .and()
//                .sessionManagement()
//                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//                .and()
//                .addFilterBefore(new CustomAuthenticationFilter(authenticationManager()), CustomAuthorizationFilter.class)
////                .addFilterBefore(new CustomAuthorizationFilter(authenticationManager()), UsernamePasswordAuthenticationFilter.class)
//                .csrf().disable();
//
//    }
//}
