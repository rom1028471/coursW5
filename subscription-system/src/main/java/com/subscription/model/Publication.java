package com.subscription.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "publications")
public class Publication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(length = 1000)
    private String description;

    @Column(nullable = false)
    private String type; // журнал, газета, etc.

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @ElementCollection
    @CollectionTable(name = "publication_tags", joinColumns = @JoinColumn(name = "publication_id"))
    @Column(name = "tag")
    @Builder.Default
    private Set<String> tags = new HashSet<>();

    @Column(nullable = false)
    private BigDecimal price;

    @Column(nullable = false)
    private String frequency; // ежедневно, еженедельно, ежемесячно

    @Column(nullable = false)
    private boolean exclusive;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(nullable = false)
    private String publisher;

    @OneToMany(mappedBy = "publication")
    @Builder.Default
    private Set<Subscription> subscriptions = new HashSet<>();

    @ManyToMany(mappedBy = "favorites")
    @Builder.Default
    private Set<User> favoritedBy = new HashSet<>();

    @Column(nullable = false)
    @Builder.Default
    private boolean active = true;
}
