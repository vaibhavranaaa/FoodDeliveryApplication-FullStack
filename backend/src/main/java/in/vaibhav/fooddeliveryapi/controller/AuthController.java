package in.vaibhav.fooddeliveryapi.controller;

import in.vaibhav.fooddeliveryapi.io.AuthenticationRequest;
import in.vaibhav.fooddeliveryapi.io.AuthenticationResponse;
import in.vaibhav.fooddeliveryapi.service.AppUserDetailsService;
import in.vaibhav.fooddeliveryapi.util.JwtUtil;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@AllArgsConstructor

public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final AppUserDetailsService userDetailsService;
    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthenticationRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );

            UserDetails userDetails =
                    userDetailsService.loadUserByUsername(request.getEmail());

            String jwtToken = jwtUtil.generateToken(userDetails);

            return ResponseEntity.ok(
                    new AuthenticationResponse(request.getEmail(), jwtToken)
            );

        } catch (Exception ex) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }
}

