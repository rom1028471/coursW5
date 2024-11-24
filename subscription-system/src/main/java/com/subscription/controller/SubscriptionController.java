package com.subscription.controller;

import com.subscription.dto.SubscriptionDto;
import com.subscription.model.SubscriptionStatus;
import com.subscription.service.SubscriptionService;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/subscriptions")
@RequiredArgsConstructor
public class SubscriptionController {
    private final SubscriptionService subscriptionService;

    @PostMapping
    public ResponseEntity<SubscriptionDto> createSubscription(@Valid @RequestBody SubscriptionDto subscriptionDto) {
        return ResponseEntity.ok(subscriptionService.createSubscription(subscriptionDto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<SubscriptionDto> getSubscription(@PathVariable Long id) {
        return ResponseEntity.ok(subscriptionService.getSubscriptionById(id));
    }

    @GetMapping
    public ResponseEntity<Page<SubscriptionDto>> getAllSubscriptions(Pageable pageable) {
        return ResponseEntity.ok(subscriptionService.getAllSubscriptions(pageable));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SubscriptionDto> updateSubscription(
            @PathVariable Long id,
            @Valid @RequestBody SubscriptionDto subscriptionDto) {
        return ResponseEntity.ok(subscriptionService.updateSubscription(id, subscriptionDto));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<SubscriptionDto> updateStatus(
            @PathVariable Long id,
            @RequestParam SubscriptionStatus status) {
        return ResponseEntity.ok(subscriptionService.updateSubscriptionStatus(id, status));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSubscription(@PathVariable Long id) {
        subscriptionService.deleteSubscription(id);
        return ResponseEntity.noContent().build();
    }
}
