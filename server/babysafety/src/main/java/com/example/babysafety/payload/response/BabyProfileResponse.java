package com.example.babysafety.payload.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BabyProfileResponse {
    private String id;
    private String name;
    private int ageInMonths;
    private String gender;

    public BabyProfileResponse(String id, String name, int ageInMonths, String gender) {
        this.id = id;
        this.name = name;
        this.ageInMonths = ageInMonths;
        this.gender = gender;
    }
}