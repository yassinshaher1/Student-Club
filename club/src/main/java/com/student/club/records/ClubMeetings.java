package com.student.club.records;

import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

public record ClubMeetings(

        @Id
        Integer clubMeetingId,
        Integer clubId,
        LocalDateTime meetingDate,
        String agenda,
        String location,
        String minutes
) {
}
