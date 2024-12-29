package com.student.club.records;

import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

public record EventRegistration(

        @Id
        Integer eventRegistrationId,
        Integer eventId,
        Integer userId,
        LocalDateTime registrationDate,
        com.student.club.status.EventRegistrationStatus status
) {
}
