package com.example.babysafety.service;

import com.example.babysafety.model.BabyProfile;
import com.example.babysafety.payload.request.BabyProfileRequest;
import com.example.babysafety.repository.BabyProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BabyProfileService {
    @Autowired
    private BabyProfileRepository babyProfileRepository;

    public BabyProfile createBabyProfile(BabyProfile babyProfile) {
        return babyProfileRepository.save(babyProfile);
    }

    public List<BabyProfile> getBabyProfilesByUserId(String userId) {
        return babyProfileRepository.findByUserId(userId);
    }

    // ...existing code...

public void deleteBabyProfile(String id, String userId) {
    BabyProfile profile = babyProfileRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Baby profile not found"));
    if (!profile.getUserId().equals(userId)) {
        throw new RuntimeException("Unauthorized");
    }
    babyProfileRepository.deleteById(id);
}

public BabyProfile updateBabyProfile(String id, BabyProfileRequest request, String userId) {
    BabyProfile profile = babyProfileRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Baby profile not found"));
    if (!profile.getUserId().equals(userId)) {
        throw new RuntimeException("Unauthorized");
    }
    profile.setName(request.getName());
    profile.setBirthDate(request.getBirthDate());
    profile.setWeight(request.getWeight());
    profile.setHeight(request.getHeight());
    profile.setHealthIssues(request.getHealthIssues());
    profile.setAllergies(request.getAllergies());
    profile.setNotes(request.getNotes());
    profile.setAgeInMonths(request.getAgeInMonths() != null ? request.getAgeInMonths() : 0);
    profile.setGender(request.getGender());
    return babyProfileRepository.save(profile);
}
}

