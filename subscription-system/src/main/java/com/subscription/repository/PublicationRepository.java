package com.subscription.repository;

import com.subscription.model.Publication;
import com.subscription.model.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PublicationRepository extends JpaRepository<Publication, Long> {
    Page<Publication> findByCategory(Category category, Pageable pageable);
    Page<Publication> findByCategoryId(Long categoryId, Pageable pageable);
    Page<Publication> findByTitleContainingIgnoreCase(String title, Pageable pageable);
    Page<Publication> findByType(String type, Pageable pageable);
    
    @Query("SELECT p FROM Publication p WHERE p.active = true AND :tag MEMBER OF p.tags")
    Page<Publication> findByTag(String tag, Pageable pageable);
    
    @Query("SELECT p FROM Publication p WHERE p.active = true AND p.price <= :maxPrice")
    Page<Publication> findByPriceLessThanEqual(double maxPrice, Pageable pageable);
}
