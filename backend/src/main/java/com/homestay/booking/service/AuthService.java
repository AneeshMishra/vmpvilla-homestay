package com.homestay.booking.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.homestay.booking.dto.request.GoogleLoginRequest;
import com.homestay.booking.dto.response.AuthResponse;
import com.homestay.booking.exception.UnauthorizedException;
import com.homestay.booking.model.User;
import com.homestay.booking.model.enums.UserRole;
import com.homestay.booking.repository.UserRepository;
import com.homestay.booking.security.JwtTokenProvider;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;

    @Value("${app.mode:test}")
    private String appMode;

    @Value("${google.client.id}")
    private String googleClientId;

    private GoogleIdTokenVerifier verifier;

    @PostConstruct
    public void init() {
        if ("production".equalsIgnoreCase(appMode)) {
            verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
                    .setAudience(Collections.singletonList(googleClientId))
                    .build();
            log.info("Google OAuth enabled - Production mode");
        } else {
            log.info("Google OAuth disabled - Test mode");
        }
    }

    @Transactional
    public AuthResponse authenticateWithGoogle(GoogleLoginRequest request) {
        try {
            // Test mode: Simple authentication without Google verification
            if ("test".equalsIgnoreCase(appMode)) {
                return authenticateTestMode(request.getToken());
            }

            // Production mode: Google OAuth verification
            GoogleIdToken idToken = verifier.verify(request.getToken());

            if (idToken == null) {
                throw new UnauthorizedException("Invalid Google ID token");
            }

            GoogleIdToken.Payload payload = idToken.getPayload();
            String email = payload.getEmail();
            String name = (String) payload.get("name");
            String googleId = payload.getSubject();

            if (!payload.getEmailVerified()) {
                throw new UnauthorizedException("Email not verified");
            }

            User user = userRepository.findByEmail(email)
                    .orElseGet(() -> createNewUser(email, name, googleId));

            if (user.getGoogleId() == null) {
                user.setGoogleId(googleId);
                user = userRepository.save(user);
            }

            String jwt = jwtTokenProvider.generateToken(
                    user.getId(),
                    user.getEmail(),
                    user.getRole().toString()
            );

            log.info("User authenticated successfully: {}", email);

            return AuthResponse.builder()
                    .token(jwt)
                    .userId(user.getId())
                    .email(user.getEmail())
                    .name(user.getName())
                    .role(user.getRole().toString())
                    .build();

        } catch (Exception e) {
            log.error("Google authentication failed: {}", e.getMessage());
            throw new UnauthorizedException("Authentication failed: " + e.getMessage());
        }
    }

    @Transactional
    public AuthResponse authenticateTestMode(String email) {
        log.info("Test mode authentication for: {}", email);

        // For test mode, create/get user with provided email
        final String userEmail;
        if (email == null || email.trim().isEmpty()) {
            userEmail = "test@homestay.com"; // Default test user
        } else {
            userEmail = email;
        }

        User user = userRepository.findByEmail(userEmail)
                .orElseGet(() -> createTestUser(userEmail));

        String jwt = jwtTokenProvider.generateToken(
                user.getId(),
                user.getEmail(),
                user.getRole().toString()
        );

        log.info("Test user authenticated: {}", userEmail);

        return AuthResponse.builder()
                .token(jwt)
                .userId(user.getId())
                .email(user.getEmail())
                .name(user.getName())
                .role(user.getRole().toString())
                .build();
    }

    private User createTestUser(String email) {
        String name = "Test User";
        if (email.contains("@")) {
            name = email.substring(0, email.indexOf("@"));
            name = name.substring(0, 1).toUpperCase() + name.substring(1);
        }

        User newUser = User.builder()
                .email(email)
                .name(name)
                .googleId("test-" + email)
                .role(UserRole.USER)
                .build();

        User savedUser = userRepository.save(newUser);
        log.info("Test user created: {}", email);
        return savedUser;
    }

    private User createNewUser(String email, String name, String googleId) {
        User newUser = User.builder()
                .email(email)
                .name(name)
                .googleId(googleId)
                .role(UserRole.USER)
                .build();

        User savedUser = userRepository.save(newUser);
        log.info("New user created: {}", email);
        return savedUser;
    }
}
