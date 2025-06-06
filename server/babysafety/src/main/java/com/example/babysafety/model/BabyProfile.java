package com.example.babysafety.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Document(collection = "baby_profiles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BabyProfile {
    @Id
    private String id;

    private String userId;
    private String name;
    private String birthDate;    // e.g., "dd-mm-yyyy"
    private String weight;       // e.g., "7.2 kg"
    private String height;       // e.g., "65 cm"
    private String healthIssues;
    private String allergies;
    private String notes;
    private int ageInMonths;
    private String gender;
}