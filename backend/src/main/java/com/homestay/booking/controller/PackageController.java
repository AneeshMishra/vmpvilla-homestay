package com.homestay.booking.controller;

import com.homestay.booking.dto.response.PackageResponse;
import com.homestay.booking.service.PackageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/packages")
@RequiredArgsConstructor
public class PackageController {

    private final PackageService packageService;

    @GetMapping
    public ResponseEntity<List<PackageResponse>> getAllPackages() {
        List<PackageResponse> packages = packageService.getAllPackages();
        return ResponseEntity.ok(packages);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PackageResponse> getPackageById(@PathVariable Long id) {
        PackageResponse pkg = packageService.getPackageById(id);
        return ResponseEntity.ok(pkg);
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<PackageResponse> getPackageByName(@PathVariable String name) {
        PackageResponse pkg = packageService.getPackageByName(name);
        return ResponseEntity.ok(pkg);
    }
}
