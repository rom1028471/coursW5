package com.subscription.service;

import com.subscription.dto.SubscriptionDto;
import com.subscription.model.Publication;
import com.subscription.model.Subscription;
import com.subscription.model.User;
import com.subscription.repository.PublicationRepository;
import com.subscription.repository.SubscriptionRepository;
import com.subscription.repository.UserRepository;
import javax.persistence.EntityNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import static com.subscription.model.SubscriptionStatus.*;

@Service
public class SubscriptionService {
    private final SubscriptionRepository subscriptionRepository;
    private final UserRepository userRepository;
    private final PublicationRepository publicationRepository;

    public SubscriptionService(SubscriptionRepository subscriptionRepository,
                             UserRepository userRepository,
                             PublicationRepository publicationRepository) {
        this.subscriptionRepository = subscriptionRepository;
        this.userRepository = userRepository;
        this.publicationRepository = publicationRepository;
    }

    @Transactional
    public SubscriptionDto createSubscription(SubscriptionDto dto) {
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Publication publication = publicationRepository.findById(dto.getPublicationId())
                .orElseThrow(() -> new EntityNotFoundException("Publication not found"));

        Subscription subscription = new Subscription();
        subscription.setUser(user);
        subscription.setPublication(publication);
        subscription.setStartDate(dto.getStartDate());
        subscription.setEndDate(dto.getEndDate());
        subscription.setPrice(dto.getPrice());
        subscription.setStatus(ACTIVE);
        subscription.setAutoRenewal(dto.isAutoRenewal());

        Subscription savedSubscription = subscriptionRepository.save(subscription);
        return convertToDto(savedSubscription);
    }

    @Transactional(readOnly = true)
    public SubscriptionDto getSubscriptionById(Long id) {
        Subscription subscription = subscriptionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Subscription not found"));
        return convertToDto(subscription);
    }

    @Transactional(readOnly = true)
    public Page<SubscriptionDto> getAllSubscriptions(Pageable pageable) {
        return subscriptionRepository.findAll(pageable)
                .map(this::convertToDto);
    }

    @Transactional
    public SubscriptionDto updateSubscription(Long id, SubscriptionDto dto) {
        Subscription subscription = subscriptionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Subscription not found"));

        subscription.setStartDate(dto.getStartDate());
        subscription.setEndDate(dto.getEndDate());
        subscription.setPrice(dto.getPrice());
        subscription.setAutoRenewal(dto.isAutoRenewal());

        if (dto.getStatus() != null) {
            subscription.setStatus(dto.getStatus());
        }

        Subscription updatedSubscription = subscriptionRepository.save(subscription);
        return convertToDto(updatedSubscription);
    }

    @Transactional
    public SubscriptionDto updateSubscriptionStatus(Long id, com.subscription.model.SubscriptionStatus status) {
        Subscription subscription = subscriptionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Subscription not found"));

        subscription.setStatus(status);
        
        if (status == CANCELLED) {
            subscription.setCancellationDate(LocalDateTime.now());
        }

        Subscription updatedSubscription = subscriptionRepository.save(subscription);
        return convertToDto(updatedSubscription);
    }

    @Transactional
    public void deleteSubscription(Long id) {
        if (!subscriptionRepository.existsById(id)) {
            throw new EntityNotFoundException("Subscription not found");
        }
        subscriptionRepository.deleteById(id);
    }

    private SubscriptionDto convertToDto(Subscription subscription) {
        SubscriptionDto dto = new SubscriptionDto();
        dto.setId(subscription.getId());
        dto.setUserId(subscription.getUser().getId());
        dto.setPublicationId(subscription.getPublication().getId());
        dto.setStartDate(subscription.getStartDate());
        dto.setEndDate(subscription.getEndDate());
        dto.setPrice(subscription.getPrice());
        dto.setStatus(subscription.getStatus());
        dto.setAutoRenewal(subscription.isAutoRenewal());
        dto.setLastDeliveryDate(subscription.getLastDeliveryDate());
        dto.setNextDeliveryDate(subscription.getNextDeliveryDate());
        dto.setCancellationDate(subscription.getCancellationDate());
        dto.setCancellationReason(subscription.getCancellationReason());
        return dto;
    }
}
