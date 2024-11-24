package com.subscription.service;

import com.subscription.model.Delivery;
import com.subscription.model.Subscription;
import com.subscription.model.SubscriptionStatus;
import com.subscription.repository.DeliveryRepository;
import com.subscription.repository.SubscriptionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class DeliveryServiceTest {

    @Mock
    private DeliveryRepository deliveryRepository;

    @Mock
    private SubscriptionRepository subscriptionRepository;

    @InjectMocks
    private DeliveryService deliveryService;

    private Subscription subscription;
    private Delivery delivery;

    @BeforeEach
    void setUp() {
        subscription = new Subscription();
        subscription.setId(1L);
        subscription.setStatus(SubscriptionStatus.ACTIVE);

        delivery = new Delivery();
        delivery.setId(1L);
        delivery.setSubscription(subscription);
        delivery.setScheduledDate(LocalDateTime.now().plusDays(1));
        delivery.setStatus(Delivery.DeliveryStatus.SCHEDULED);
    }

    @Test
    void scheduleDelivery_Success() {
        when(subscriptionRepository.findById(1L)).thenReturn(Optional.of(subscription));
        when(deliveryRepository.save(any(Delivery.class))).thenReturn(delivery);

        Delivery result = deliveryService.scheduleDelivery(1L);

        assertNotNull(result);
        assertEquals(Delivery.DeliveryStatus.SCHEDULED, result.getStatus());
        assertNotNull(result.getScheduledDate());
        verify(deliveryRepository).save(any(Delivery.class));
    }

    @Test
    void scheduleDelivery_SubscriptionNotFound() {
        when(subscriptionRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(IllegalArgumentException.class,
                () -> deliveryService.scheduleDelivery(1L));

        verify(deliveryRepository, never()).save(any());
    }

    @Test
    void scheduleDelivery_InactiveSubscription() {
        subscription.setStatus(SubscriptionStatus.SUSPENDED);
        when(subscriptionRepository.findById(1L)).thenReturn(Optional.of(subscription));

        assertThrows(IllegalStateException.class,
                () -> deliveryService.scheduleDelivery(1L));

        verify(deliveryRepository, never()).save(any());
    }

    @Test
    void getDeliveriesBySubscription() {
        Page<Delivery> deliveryPage = new PageImpl<>(Collections.singletonList(delivery));
        Pageable pageable = Pageable.unpaged();

        when(deliveryRepository.findBySubscriptionId(1L, pageable)).thenReturn(deliveryPage);

        Page<Delivery> result = deliveryService.getDeliveriesBySubscription(1L, pageable);

        assertNotNull(result);
        assertEquals(1, result.getTotalElements());
        assertEquals(delivery, result.getContent().get(0));
    }

    @Test
    void updateDeliveryStatus() {
        delivery.setStatus(Delivery.DeliveryStatus.IN_TRANSIT);
        when(deliveryRepository.findById(1L)).thenReturn(Optional.of(delivery));
        when(deliveryRepository.save(any(Delivery.class))).thenReturn(delivery);

        Delivery result = deliveryService.updateDeliveryStatus(1L, Delivery.DeliveryStatus.DELIVERED);

        assertNotNull(result);
        assertEquals(Delivery.DeliveryStatus.DELIVERED, result.getStatus());
        verify(deliveryRepository).save(delivery);
    }

    @Test
    void findPendingDeliveries() {
        LocalDateTime cutoffDate = LocalDateTime.now();
        List<Delivery> pendingDeliveries = Collections.singletonList(delivery);

        when(deliveryRepository.findByStatusAndScheduledDateBefore(
                Delivery.DeliveryStatus.SCHEDULED, cutoffDate))
                .thenReturn(pendingDeliveries);

        List<Delivery> result = deliveryService.findPendingDeliveries(cutoffDate);

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(delivery, result.get(0));
    }
}
