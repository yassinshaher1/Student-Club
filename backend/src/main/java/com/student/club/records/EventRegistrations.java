package com.student.club.records;

import com.student.club.status.EventRegistrationStatus;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

public record EventRegistrations(

        @Id
        Integer eventRegistrationId,
        String eventName,
        String userName,
        LocalDateTime registrationDate,
        EventRegistrationStatus status
) {
}
