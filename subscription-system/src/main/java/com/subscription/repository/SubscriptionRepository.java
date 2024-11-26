package com.subscription.repository;

import com.subscription.model.Subscription;
import com.subscription.model.SubscriptionStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {
    List<Subscription> findByUserId(Long userId);
    List<Subscription> findByPublicationId(Long publicationId);
    List<Subscription> findByStatus(SubscriptionStatus status);
    
    @Query("SELECT s FROM Subscription s WHERE s.endDate <= :date AND s.status = 'ACTIVE'")
    List<Subscription> findExpiringSubscriptions(LocalDateTime date);
    
    @Query("SELECT s FROM Subscription s WHERE s.user.id = :userId AND s.status = :status")
    List<Subscription> findByUserIdAndStatus(Long userId, SubscriptionStatus status);
    
    @Query("SELECT s FROM Subscription s WHERE s.autoRenewal = true AND s.endDate BETWEEN :startDate AND :endDate")
    List<Subscription> findSubscriptionsForRenewal(LocalDateTime startDate, LocalDateTime endDate);
    
    @Query("SELECT COUNT(s) FROM Subscription s WHERE s.publication.id = :publicationId AND s.status = 'ACTIVE'")
    Long countActiveSubscriptionsByPublication(Long publicationId);
}
