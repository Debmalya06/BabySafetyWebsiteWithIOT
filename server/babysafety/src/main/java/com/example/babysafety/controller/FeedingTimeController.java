package com.example.babysafety.controller;

import com.example.babysafety.model.FeedingTime;
import com.example.babysafety.service.FeedingTimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feeding")
public class FeedingTimeController {

    @Autowired
    private FeedingTimeService feedingTimeService;

    @PostMapping("/add")
    public ResponseEntity<?> addFeedingEntry(@RequestBody FeedingTime feedingTime) {
        return ResponseEntity.ok(feedingTimeService.addFeedingTime(feedingTime));
    }

    @GetMapping("/{babyId}")
    public ResponseEntity<?> getFeedingTimes(@PathVariable String babyId) {
        return ResponseEntity.ok(feedingTimeService.getFeedingTimesByBabyId(babyId));
    }
}
