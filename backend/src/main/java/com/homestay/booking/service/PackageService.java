package com.homestay.booking.service;

import com.homestay.booking.dto.response.PackageResponse;
import com.homestay.booking.exception.ResourceNotFoundException;
import com.homestay.booking.model.Package;
import com.homestay.booking.repository.PackageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class PackageService {

    private final PackageRepository packageRepository;

    @Transactional(readOnly = true)
    public List<PackageResponse> getAllPackages() {
        return packageRepository.findAll().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public PackageResponse getPackageById(Long id) {
        Package pkg = packageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Package not found with id: " + id));
        return convertToResponse(pkg);
    }

    @Transactional(readOnly = true)
    public PackageResponse getPackageByName(String name) {
        Package pkg = packageRepository.findByName(name)
                .orElseThrow(() -> new ResourceNotFoundException("Package not found with name: " + name));
        return convertToResponse(pkg);
    }

    private PackageResponse convertToResponse(Package pkg) {
        return PackageResponse.builder()
                .id(pkg.getId())
                .name(pkg.getName())
                .description(pkg.getDescription())
                .price(pkg.getPrice())
                .build();
    }
}
