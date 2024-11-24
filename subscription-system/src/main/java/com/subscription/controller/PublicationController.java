package com.subscription.controller;

import com.subscription.dto.PublicationDto;
import com.subscription.service.PublicationService;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/publications")
@RequiredArgsConstructor
public class PublicationController {
    private final PublicationService publicationService;

    @PostMapping
    public ResponseEntity<PublicationDto> createPublication(@Valid @RequestBody PublicationDto publicationDto) {
        return new ResponseEntity<>(publicationService.createPublication(publicationDto), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PublicationDto> getPublicationById(@PathVariable Long id) {
        return ResponseEntity.ok(publicationService.getPublicationById(id));
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<Page<PublicationDto>> getPublicationsByCategory(
            @PathVariable Long categoryId,
            @PageableDefault(size = 20) Pageable pageable) {
        return ResponseEntity.ok(publicationService.getPublicationsByCategory(categoryId, pageable));
    }

    @GetMapping("/search")
    public ResponseEntity<Page<PublicationDto>> searchPublications(
            @RequestParam String title,
            @PageableDefault(size = 20) Pageable pageable) {
        return ResponseEntity.ok(publicationService.searchPublications(title, pageable));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PublicationDto> updatePublication(
            @PathVariable Long id,
            @Valid @RequestBody PublicationDto publicationDto) {
        return ResponseEntity.ok(publicationService.updatePublication(id, publicationDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePublication(@PathVariable Long id) {
        publicationService.deletePublication(id);
        return ResponseEntity.noContent().build();
    }
}
