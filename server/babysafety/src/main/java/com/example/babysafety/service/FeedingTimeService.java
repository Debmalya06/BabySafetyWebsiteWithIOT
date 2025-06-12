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
    List<FeedingTime> result = repository.findByBabyId(babyId);
    System.out.println("babyId: " + babyId + ", result: " + result);
    return result;
}

public List<FeedingTime> getAllFeedingTimes() {
    return repository.findAll();
}
}
