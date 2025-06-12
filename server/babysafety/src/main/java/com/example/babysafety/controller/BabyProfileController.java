package com.example.babysafety.controller;

import com.example.babysafety.model.BabyProfile;
import com.example.babysafety.model.FeedingTime;
import com.example.babysafety.payload.request.BabyProfileRequest;
import com.example.babysafety.service.BabyProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import com.example.babysafety.security.UserDetailsImpl;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import com.example.babysafety.service.FeedingTimeService;

@RestController
@RequestMapping("/api/baby")
public class BabyProfileController {

    @Autowired
    private BabyProfileService babyProfileService;

    @Autowired
    private FeedingTimeService feedingTimeService;

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
    
// filepath: d:\Web_Dev\WEB_Project\BabySafetyWebsite\server\babysafety\src\main\java\com\example\babysafety\controller\BabyProfileController.java

@DeleteMapping("/{id}")
public void deleteBabyProfile(@PathVariable String id, @AuthenticationPrincipal UserDetailsImpl userDetails) {
    babyProfileService.deleteBabyProfile(id, userDetails.getId());
}

@PutMapping("/{id}")
public BabyProfile updateBabyProfile(
        @PathVariable String id,
        @RequestBody BabyProfileRequest request,
        @AuthenticationPrincipal UserDetailsImpl userDetails) {
    return babyProfileService.updateBabyProfile(id, request, userDetails.getId());
}

@GetMapping("/all")
public ResponseEntity<List<FeedingTime>> getAllFeedingTimes() {
    return ResponseEntity.ok(feedingTimeService.getAllFeedingTimes());
}

@GetMapping("/babyFeed/{babyId}")
public ResponseEntity<List<FeedingTime>> getFeedingTimesByBaby(@PathVariable String babyId) {
    return ResponseEntity.ok(feedingTimeService.getFeedingTimesByBabyId(babyId));
}

}
