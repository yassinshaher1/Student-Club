const events = [
    {
      title: "AI Security Talk",
      place: "SUT Auditorium",
      time: "2024-12-03 12:30",
    },
    {
      title: "Web3 Workshop",
      place: "Innovation Lab",
      time: "2024-12-05 14:00",
    },
    {
      title: "Hackathon 2024",
      place: "Tech Hub",
      time: "2024-12-10 09:00",
    },
    {
      title: "ML Bootcamp",
      place: "CS Building",
      time: "2024-12-15 13:00",
    },
    {
      title: "Quantum Computing Basics",
      place: "Physics Lab",
      time: "2024-12-20 15:00",
    },
    {
      title: "Cloud Computing Seminar",
      place: "IT Auditorium",
      time: "2024-12-25 10:00",
    },
    {
      title: "Cybersecurity Workshop",
      place: "Main Library Hall",
      time: "2024-01-02 14:00",
    },
    {
      title: "Data Science 101",
      place: "Lab 3, CS Department",
      time: "2024-01-08 13:00",
    },
    {
      title: "Ethical Hacking Meetup",
      place: "Room 205, Tech Center",
      time: "2024-01-12 16:00",
    },
    {
      title: "IoT Devices Demo",
      place: "Electronics Lab",
      time: "2024-01-17 11:00",
    },
    {
      title: "Blockchain Summit",
      place: "Conference Hall B",
      time: "2024-01-20 09:00",
    },
    {
      title: "Startup Pitch Fest",
      place: "SUT Auditorium",
      time: "2024-01-22 10:00",
    },
    {
      title: "Robotics Club Showcase",
      place: "Lab 1, Engineering Block",
      time: "2024-01-25 14:30",
    },
    {
      title: "Tech Leadership Talk",
      place: "Main Hall",
      time: "2024-01-30 10:00",
    },
    {
      title: "AR/VR Hands-On Workshop",
      place: "Creative Lab",
      time: "2024-02-04 15:00",
    },
    {
      title: "Python for Beginners",
      place: "Room 101, CS Department",
      time: "2024-02-10 14:00",
    },
    {
      title: "Tech Entrepreneurship Panel",
      place: "Innovation Lab",
      time: "2024-02-12 10:30",
    },
    {
      title: "Autonomous Vehicles Expo",
      place: "Engineering Courtyard",
      time: "2024-02-16 09:00",
    },
    {
      title: "Mobile App Development",
      place: "Room 307, IT Block",
      time: "2024-02-20 13:00",
    },
    {
      title: "AI in Healthcare Panel",
      place: "Medical Auditorium",
      time: "2024-02-25 11:00",
    },
    {
      title: "Tech Careers Fair",
      place: "Main Campus Ground",
      time: "2024-03-01 09:00",
    },
    {
      title: "Introduction to React.js",
      place: "Room 210, CS Department",
      time: "2024-03-05 15:00",
    },
    {
      title: "Smart Cities Symposium",
      place: "Tech Hub",
      time: "2024-03-10 10:00",
    },
    {
      title: "Cloud Architecture Insights",
      place: "Room 405, IT Block",
      time: "2024-03-15 13:00",
    },
    {
      title: "Networking Basics Workshop",
      place: "Networking Lab",
      time: "2024-03-20 14:00",
    },
    {
      title: "Data Privacy Seminar",
      place: "Room 302, CS Block",
      time: "2024-03-25 11:00",
    },
    {
      title: "Edge Computing Talk",
      place: "Tech Seminar Room",
      time: "2024-03-30 14:30",
    },
    {
      title: "Open Source Contributions",
      place: "Room 150, Library",
      time: "2024-04-05 12:00",
    },
    {
      title: "AI & Ethics Debate",
      place: "Conference Hall A",
      time: "2024-04-10 15:00",
    },
    {
      title: "Gamification in Education",
      place: "Room 12, Main Building",
      time: "2024-04-15 10:00",
    },
  ];
  

export const getHomeEvents = () => events.slice(0, 4);
export const getAllEvents = () => events; 