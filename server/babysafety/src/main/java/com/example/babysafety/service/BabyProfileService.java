package com.example.babysafety.service;

import com.example.babysafety.model.BabyProfile;
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
}
