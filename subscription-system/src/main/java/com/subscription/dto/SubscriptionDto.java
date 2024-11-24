package com.subscription.dto;

import com.subscription.model.SubscriptionStatus;
import javax.validation.constraints.Future;
import javax.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class SubscriptionDto {
    private Long id;

    @NotNull(message = "User ID is required")
    private Long userId;

    @NotNull(message = "Publication ID is required")
    private Long publicationId;

    @NotNull(message = "Start date is required")
    private LocalDateTime startDate;

    @NotNull(message = "End date is required")
    @Future(message = "End date must be in the future")
    private LocalDateTime endDate;

    @NotNull(message = "Price is required")
    private BigDecimal price;

    private com.subscription.model.SubscriptionStatus status;

    private boolean autoRenewal;

    private LocalDateTime lastDeliveryDate;

    private LocalDateTime nextDeliveryDate;

    private LocalDateTime cancellationDate;

    private String cancellationReason;

    public SubscriptionDto() {}

    public SubscriptionDto(Long id, Long userId, Long publicationId, 
                         LocalDateTime startDate, LocalDateTime endDate, 
                         com.subscription.model.SubscriptionStatus status) {
        this.id = id;
        this.userId = userId;
        this.publicationId = publicationId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;
    }
}
