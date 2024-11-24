package com.subscription.service;

import com.subscription.model.Payment;
import com.subscription.model.Subscription;
import com.subscription.model.SubscriptionStatus;
import com.subscription.repository.PaymentRepository;
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

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PaymentServiceTest {

    @Mock
    private PaymentRepository paymentRepository;

    @Mock
    private SubscriptionRepository subscriptionRepository;

    @InjectMocks
    private PaymentService paymentService;

    private Subscription subscription;
    private Payment payment;

    @BeforeEach
    void setUp() {
        subscription = new Subscription();
        subscription.setId(1L);
        subscription.setStatus(SubscriptionStatus.ACTIVE);

        payment = new Payment();
        payment.setId(1L);
        payment.setAmount(new BigDecimal("29.99"));
        payment.setSubscription(subscription);
        payment.setPaymentDate(LocalDateTime.now());
        payment.setStatus(Payment.PaymentStatus.COMPLETED);
        payment.setTransactionId("DEMO-123");
    }

    @Test
    void processPayment_Success() {
        // Given
        when(subscriptionRepository.findById(1L)).thenReturn(Optional.of(subscription));
        when(paymentRepository.save(any(Payment.class))).thenAnswer(invocation -> {
            Payment savedPayment = invocation.getArgument(0);
            savedPayment.setId(1L);
            savedPayment.setTransactionId("DEMO-" + System.currentTimeMillis());
            return savedPayment;
        });
        when(subscriptionRepository.save(any(Subscription.class))).thenReturn(subscription);

        // When
        Payment result = paymentService.processPayment(1L, new BigDecimal("29.99"));

        // Then
        assertNotNull(result);
        assertEquals(Payment.PaymentStatus.COMPLETED, result.getStatus());
        assertNotNull(result.getTransactionId());
        assertTrue(result.getTransactionId().startsWith("DEMO-"));
        assertEquals(new BigDecimal("29.99"), result.getAmount());
        verify(paymentRepository).save(any(Payment.class));
        verify(subscriptionRepository).save(subscription);
    }

    @Test
    void getPaymentsBySubscription() {
        Page<Payment> paymentPage = new PageImpl<>(Collections.singletonList(payment));
        Pageable pageable = Pageable.unpaged();

        when(paymentRepository.findBySubscriptionId(1L, pageable)).thenReturn(paymentPage);

        Page<Payment> result = paymentService.getPaymentsBySubscription(1L, pageable);

        assertNotNull(result);
        assertEquals(1, result.getTotalElements());
        assertEquals(payment, result.getContent().get(0));
    }
}
