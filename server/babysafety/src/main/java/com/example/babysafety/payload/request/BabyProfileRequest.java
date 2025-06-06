package com.example.babysafety.payload.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BabyProfileRequest {
    @NotBlank
    private String name;
    @NotBlank
    private String birthDate;
    private String weight;
    private String height;
    private String healthIssues;
    private String allergies;
    private String notes;
    private Integer ageInMonths;
    private String gender;
}