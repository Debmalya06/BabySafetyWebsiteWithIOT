package com.example.babysafety.repository;

import com.example.babysafety.model.BabyProfile;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface BabyProfileRepository extends MongoRepository<BabyProfile, String> {
    List<BabyProfile> findByUserId(String userId);
}
