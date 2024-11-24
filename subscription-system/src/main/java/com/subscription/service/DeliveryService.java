package com.subscription.service;

import com.subscription.model.Delivery;
import com.subscription.model.Subscription;
import com.subscription.model.SubscriptionStatus;
import com.subscription.repository.DeliveryRepository;
import com.subscription.repository.SubscriptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DeliveryService {

    private final DeliveryRepository deliveryRepository;
    private final SubscriptionRepository subscriptionRepository;

    @Transactional
    public Delivery scheduleDelivery(Long subscriptionId) {
        Subscription subscription = subscriptionRepository.findById(subscriptionId)
                .orElseThrow(() -> new IllegalArgumentException("Subscription not found"));

        if (subscription.getStatus() != SubscriptionStatus.ACTIVE) {
            throw new IllegalStateException("Cannot schedule delivery for inactive subscription");
        }

        // Create new delivery record
        Delivery delivery = new Delivery();
        delivery.setSubscription(subscription);
        delivery.setScheduledDate(LocalDateTime.now().plusDays(1));
        delivery.setStatus(Delivery.DeliveryStatus.SCHEDULED);

        return deliveryRepository.save(delivery);
    }

    @Transactional
    public Delivery updateDeliveryStatus(Long deliveryId, Delivery.DeliveryStatus status) {
        Delivery delivery = deliveryRepository.findById(deliveryId)
                .orElseThrow(() -> new IllegalArgumentException("Delivery not found"));

        // Simulate delivery status update
        delivery.setStatus(status);
        if (status == Delivery.DeliveryStatus.DELIVERED) {
            delivery.setDeliveredDate(LocalDateTime.now());
        }

        return deliveryRepository.save(delivery);
    }

    @Transactional(readOnly = true)
    public Page<Delivery> getDeliveriesBySubscription(Long subscriptionId, Pageable pageable) {
        return deliveryRepository.findBySubscriptionId(subscriptionId, pageable);
    }

    @Transactional(readOnly = true)
    public Delivery getDelivery(Long deliveryId) {
        return deliveryRepository.findById(deliveryId)
                .orElseThrow(() -> new IllegalArgumentException("Delivery not found"));
    }

    @Scheduled(cron = "0 0 1 * * *") // Run at 1 AM every day
    @Transactional
    public void processScheduledDeliveries() {
        List<Delivery> scheduledDeliveries = deliveryRepository
                .findByStatusAndScheduledDateBefore(
                    Delivery.DeliveryStatus.SCHEDULED,
                    LocalDateTime.now()
                );

        // Simulate processing of scheduled deliveries
        for (Delivery delivery : scheduledDeliveries) {
            delivery.setStatus(Delivery.DeliveryStatus.IN_TRANSIT);
            deliveryRepository.save(delivery);
        }
    }

    @Transactional
    public Delivery cancelDelivery(Long deliveryId) {
        Delivery delivery = getDelivery(deliveryId);
        if (delivery.getStatus() != Delivery.DeliveryStatus.SCHEDULED) {
            throw new IllegalStateException("Only scheduled deliveries can be cancelled");
        }

        delivery.setStatus(Delivery.DeliveryStatus.CANCELLED);
        return deliveryRepository.save(delivery);
    }

    @Transactional(readOnly = true)
    public List<Delivery> findPendingDeliveries(LocalDateTime cutoffDate) {
        return deliveryRepository.findByStatusAndScheduledDateBefore(
            Delivery.DeliveryStatus.SCHEDULED, 
            cutoffDate
        );
    }
}
