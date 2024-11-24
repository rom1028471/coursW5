package com.subscription.dto;

import com.subscription.model.Delivery;
import javax.validation.constraints.NotNull;
import lombok.Data;

@Data
public class DeliveryStatusRequest {
    @NotNull(message = "Status is required")
    private Delivery.DeliveryStatus status;
}
