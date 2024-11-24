package com.subscription.repository;

import com.subscription.model.Delivery;
import com.subscription.model.Delivery.DeliveryStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface DeliveryRepository extends JpaRepository<Delivery, Long> {
    Page<Delivery> findBySubscriptionId(Long subscriptionId, Pageable pageable);
    
    List<Delivery> findByStatusAndScheduledDateBefore(DeliveryStatus status, LocalDateTime date);
}
