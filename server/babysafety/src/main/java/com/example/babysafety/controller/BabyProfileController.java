package com.example.babysafety.controller;

import com.example.babysafety.model.BabyProfile;
import com.example.babysafety.payload.request.BabyProfileRequest;
import com.example.babysafety.service.BabyProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import com.example.babysafety.security.UserDetailsImpl;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/baby")
public class BabyProfileController {

    @Autowired
    private BabyProfileService babyProfileService;

   // In your BabyProfileController
@PostMapping("/add")
public BabyProfile addBabyProfile(@RequestBody BabyProfileRequest request, @AuthenticationPrincipal UserDetailsImpl userDetails) {
    BabyProfile profile = new BabyProfile();
    profile.setUserId(userDetails.getId());
    profile.setName(request.getName());
    profile.setBirthDate(request.getBirthDate());
    profile.setWeight(request.getWeight());
    profile.setHeight(request.getHeight());
    profile.setHealthIssues(request.getHealthIssues());
    profile.setAllergies(request.getAllergies());
    profile.setNotes(request.getNotes());
    profile.setAgeInMonths(request.getAgeInMonths() != null ? request.getAgeInMonths() : 0);
    profile.setGender(request.getGender());
    return babyProfileService.createBabyProfile(profile);
}

    @GetMapping("/my-babies")
    public List<BabyProfile> getMyBabyProfiles(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        return babyProfileService.getBabyProfilesByUserId(userDetails.getId());
    }
}
