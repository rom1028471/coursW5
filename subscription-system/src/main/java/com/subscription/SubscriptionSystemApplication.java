package com.subscription;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class SubscriptionSystemApplication {
    public static void main(String[] args) {
        SpringApplication.run(SubscriptionSystemApplication.class, args);
    }
}
