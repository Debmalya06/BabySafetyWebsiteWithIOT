package com.example.babysafety.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalTime;

@Document(collection = "feeding_times")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FeedingTime {
    @Id
    private String id;

    private String babyId; // Link to BabyProfile
    private LocalTime time;
    private String amount;
    private String foodType;
    private String notes;
}