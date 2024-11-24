package com.subscription.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class PublicationDto {
    private Long id;
    
    @NotBlank(message = "Title is required")
    private String title;
    
    private String description;
    
    @NotNull(message = "Price is required")
    @Positive(message = "Price must be positive")
    private BigDecimal price;
    
    @NotBlank(message = "Frequency is required")
    private String frequency;
    
    @NotBlank(message = "Publisher is required")
    private String publisher;
    
    @NotNull(message = "Category ID is required")
    private Long categoryId;
}
