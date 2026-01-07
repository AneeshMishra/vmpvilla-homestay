package com.homestay.booking.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

@Configuration
@Slf4j
public class EmailConfig {

    @Value("${spring.mail.host:smtp.gmail.com}")
    private String host;

    @Value("${spring.mail.port:587}")
    private int port;

    @Value("${spring.mail.username:noreply@homestay.com}")
    private String username;

    @Value("${spring.mail.password:not-configured}")
    private String password;

    @Value("${app.mode:test}")
    private String appMode;

    @Bean
    public JavaMailSender javaMailSender() {
        // In test mode or if email not configured, return a stub that does nothing
        if ("test".equalsIgnoreCase(appMode) || "not-configured".equals(password)) {
            log.info("Email service disabled - Running in test mode or email not configured");
            return null;
        }

        log.info("Email service enabled - Configuring JavaMailSender");
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost(host);
        mailSender.setPort(port);
        mailSender.setUsername(username);
        mailSender.setPassword(password);

        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.debug", "false");

        return mailSender;
    }
}
