package com.subscription.controller;

import com.subscription.dto.DeliveryStatusRequest;
import com.subscription.model.Delivery;
import com.subscription.service.DeliveryService;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/deliveries")
@RequiredArgsConstructor
public class DeliveryController {

    private final DeliveryService deliveryService;

    @PostMapping("/subscription/{subscriptionId}")
    public ResponseEntity<Delivery> scheduleDelivery(@PathVariable Long subscriptionId) {
        Delivery delivery = deliveryService.scheduleDelivery(subscriptionId);
        return ResponseEntity.ok(delivery);
    }

    @GetMapping("/{deliveryId}")
    public ResponseEntity<Delivery> getDelivery(@PathVariable Long deliveryId) {
        Delivery delivery = deliveryService.getDelivery(deliveryId);
        return ResponseEntity.ok(delivery);
    }

    @GetMapping("/subscription/{subscriptionId}")
    public ResponseEntity<Page<Delivery>> getDeliveriesBySubscription(
            @PathVariable Long subscriptionId,
            Pageable pageable) {
        Page<Delivery> deliveries = deliveryService.getDeliveriesBySubscription(subscriptionId, pageable);
        return ResponseEntity.ok(deliveries);
    }

    @PatchMapping("/{deliveryId}/status")
    public ResponseEntity<Delivery> updateDeliveryStatus(
            @PathVariable Long deliveryId,
            @Valid @RequestBody DeliveryStatusRequest request) {
        Delivery delivery = deliveryService.updateDeliveryStatus(deliveryId, request.getStatus());
        return ResponseEntity.ok(delivery);
    }

    @PostMapping("/{deliveryId}/cancel")
    public ResponseEntity<Delivery> cancelDelivery(@PathVariable Long deliveryId) {
        Delivery delivery = deliveryService.cancelDelivery(deliveryId);
        return ResponseEntity.ok(delivery);
    }
}
