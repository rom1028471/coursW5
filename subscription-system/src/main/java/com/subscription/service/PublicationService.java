package com.subscription.service;

import com.subscription.dto.PublicationDto;
import com.subscription.model.Category;
import com.subscription.model.Publication;
import com.subscription.repository.CategoryRepository;
import com.subscription.repository.PublicationRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityNotFoundException;

@Service
public class PublicationService {
    private final PublicationRepository publicationRepository;
    private final CategoryRepository categoryRepository;

    public PublicationService(PublicationRepository publicationRepository, CategoryRepository categoryRepository) {
        this.publicationRepository = publicationRepository;
        this.categoryRepository = categoryRepository;
    }

    @Transactional
    public PublicationDto createPublication(PublicationDto publicationDto) {
        Category category = categoryRepository.findById(publicationDto.getCategoryId())
                .orElseThrow(() -> new EntityNotFoundException("Category not found"));

        Publication publication = new Publication();
        publication.setTitle(publicationDto.getTitle());
        publication.setDescription(publicationDto.getDescription());
        publication.setPrice(publicationDto.getPrice());
        publication.setFrequency(publicationDto.getFrequency());
        publication.setPublisher(publicationDto.getPublisher());
        publication.setCategory(category);

        Publication savedPublication = publicationRepository.save(publication);
        return convertToDto(savedPublication);
    }

    @Transactional(readOnly = true)
    public PublicationDto getPublicationById(Long id) {
        Publication publication = publicationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Publication not found"));
        return convertToDto(publication);
    }

    @Transactional(readOnly = true)
    public Page<PublicationDto> getPublicationsByCategory(Long categoryId, Pageable pageable) {
        return publicationRepository.findByCategoryId(categoryId, pageable)
                .map(this::convertToDto);
    }

    @Transactional(readOnly = true)
    public Page<PublicationDto> searchPublications(String title, Pageable pageable) {
        return publicationRepository.findByTitleContainingIgnoreCase(title, pageable)
                .map(this::convertToDto);
    }

    @Transactional
    public PublicationDto updatePublication(Long id, PublicationDto publicationDto) {
        Publication publication = publicationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Publication not found"));

        Category category = categoryRepository.findById(publicationDto.getCategoryId())
                .orElseThrow(() -> new EntityNotFoundException("Category not found"));

        publication.setTitle(publicationDto.getTitle());
        publication.setDescription(publicationDto.getDescription());
        publication.setPrice(publicationDto.getPrice());
        publication.setFrequency(publicationDto.getFrequency());
        publication.setPublisher(publicationDto.getPublisher());
        publication.setCategory(category);

        Publication updatedPublication = publicationRepository.save(publication);
        return convertToDto(updatedPublication);
    }

    @Transactional
    public void deletePublication(Long id) {
        if (!publicationRepository.existsById(id)) {
            throw new EntityNotFoundException("Publication not found");
        }
        publicationRepository.deleteById(id);
    }

    private PublicationDto convertToDto(Publication publication) {
        PublicationDto dto = new PublicationDto();
        dto.setId(publication.getId());
        dto.setTitle(publication.getTitle());
        dto.setDescription(publication.getDescription());
        dto.setPrice(publication.getPrice());
        dto.setFrequency(publication.getFrequency());
        dto.setPublisher(publication.getPublisher());
        dto.setCategoryId(publication.getCategory().getId());
        return dto;
    }
}
