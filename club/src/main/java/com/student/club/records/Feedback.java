package com.student.club.records;

import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

public record Feedback(

        @Id
        Integer feedbackId,
        Integer userId,
        Integer eventId,
        String feedbackText,
        Integer rating,
        LocalDateTime submittedAt
) {
}
