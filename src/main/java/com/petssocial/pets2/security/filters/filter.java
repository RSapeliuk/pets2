//
//public class LoginFilter extends AbstractAuthenticationProcessingFilter {
//
//    public LoginFilter(String url, AuthenticationManager authManager) {
//        super(new AntPathRequestMatcher(url));
//        setAuthenticationManager(authManager);
//    }
//
//
////    During the authentication attempt,
//// which is dealt by the attemptAuthentication method,
//// we retrieve the username and password from the request.
//// After they are retrieved, we use the AuthenticationManager to verify that these details match with an existing user.
//// If it does, we enter the successfulAuthentication method.
//// In this method we fetch the name from the authenticated user,
//// and pass it on to TokenAuthenticationService, which will then add a JWT to the response.
//
//    private AccountCredentials creds;
//
//    @Override
//    public Authentication attemptAuthentication(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws AuthenticationException, IOException, ServletException {
//        //this method react  on /login url  and retrive body from request
//        //then map it to model AccountCredential
//        creds = new ObjectMapper()
//                .readValue(httpServletRequest.getInputStream(), AccountCredentials.class);
//
//        System.out.println(creds);
//        // then  get default method getAuthenticationManager()
//        // and set Authentication object based on data from creds object
//
//        // if auth process if success we jump to line 65 successfulAuthentication()
//        return getAuthenticationManager().authenticate(
//                new UsernamePasswordAuthenticationToken(
//                        creds.getUsername(),
//                        creds.getPassword(),
//                        Collections.emptyList()
//                )
//        );
//
//
//    }
//
//    @Override
//    protected void successfulAuthentication(
//            HttpServletRequest req,
//            HttpServletResponse res, FilterChain chain,
//            Authentication auth) throws IOException, ServletException {
//
//        // if in prev method we was authenticate
//        // we create token
//
//        String jwtoken = Jwts.builder()
//                .setSubject(auth.getName())
//                .signWith(SignatureAlgorithm.HS512, "yes".getBytes())
//                .setExpiration(new Date(System.currentTimeMillis() + 200000))
//                .compact();
//        //and add it to header
//        res.addHeader("Authorization", "Bearer " + jwtoken);
//
//    }
//}
