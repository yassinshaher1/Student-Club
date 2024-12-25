package com.student.club.records;

import org.springframework.data.annotation.Id;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record Clubs(

        @Id
        Integer userId,
        String name,
        String description,
        LocalDate foundedAt
) {
}
