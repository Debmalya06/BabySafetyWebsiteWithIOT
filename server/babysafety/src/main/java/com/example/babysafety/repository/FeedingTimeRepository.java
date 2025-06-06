package com.example.babysafety.repository;

import com.example.babysafety.model.FeedingTime;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface FeedingTimeRepository extends MongoRepository<FeedingTime, String> {
    List<FeedingTime> findByBabyId(String babyId);
}
