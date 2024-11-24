package com.subscription.service;

import com.subscription.model.Payment;
import com.subscription.model.Subscription;
import com.subscription.model.SubscriptionStatus;
import com.subscription.repository.PaymentRepository;
import com.subscription.repository.SubscriptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final SubscriptionRepository subscriptionRepository;

    @Transactional
    public Payment processPayment(Long subscriptionId, BigDecimal amount) {
        Subscription subscription = subscriptionRepository.findById(subscriptionId)
                .orElseThrow(() -> new IllegalArgumentException("Subscription not found"));

        // Create a new payment record
        Payment payment = new Payment();
        payment.setSubscription(subscription);
        payment.setAmount(amount);
        payment.setPaymentDate(LocalDateTime.now());
        
        // Simulate successful payment
        payment.setStatus(Payment.PaymentStatus.COMPLETED);
        payment.setTransactionId("DEMO-" + System.currentTimeMillis());
        
        // Update subscription status
        subscription.setStatus(SubscriptionStatus.ACTIVE);
        subscriptionRepository.save(subscription);
        
        return paymentRepository.save(payment);
    }

    @Transactional(readOnly = true)
    public Page<Payment> getPaymentsBySubscription(Long subscriptionId, Pageable pageable) {
        return paymentRepository.findBySubscriptionId(subscriptionId, pageable);
    }

    @Transactional(readOnly = true)
    public Payment getPayment(Long paymentId) {
        return paymentRepository.findById(paymentId)
                .orElseThrow(() -> new IllegalArgumentException("Payment not found"));
    }

    @Transactional
    public Payment refundPayment(Long paymentId) {
        Payment payment = getPayment(paymentId);
        if (payment.getStatus() != Payment.PaymentStatus.COMPLETED) {
            throw new IllegalStateException("Only completed payments can be refunded");
        }

        // Simulate successful refund
        payment.setStatus(Payment.PaymentStatus.REFUNDED);
        return paymentRepository.save(payment);
    }
}
