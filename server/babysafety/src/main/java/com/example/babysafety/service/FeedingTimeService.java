package com.example.babysafety.service;

import com.example.babysafety.model.FeedingTime;
import com.example.babysafety.repository.FeedingTimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FeedingTimeService {

    @Autowired
    private FeedingTimeRepository repository;

    public FeedingTime addFeedingTime(FeedingTime feedingTime) {
        return repository.save(feedingTime);
    }

    public List<FeedingTime> getFeedingTimesByBabyId(String babyId) {
        return repository.findByBabyId(babyId);
    }
}
