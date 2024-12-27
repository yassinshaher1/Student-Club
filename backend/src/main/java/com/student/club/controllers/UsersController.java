package com.student.club.controllers;

import com.student.club.records.Users;
import com.student.club.repositories.UsersRepo;
import com.student.club.services.UsersService;
import com.student.club.status.UsersStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/users")
public class UsersController {
    private final UsersService usersService;
    private final UsersRepo usersRepo;

    @Autowired
    public UsersController(UsersService usersService, UsersRepo usersRepo) {
        this.usersService = usersService;
        this.usersRepo = usersRepo;
    }

    //handle Login
    @GetMapping("/login")
    public ResponseEntity<String> login(@RequestParam("email") String email,
                                        @RequestParam("password") String password) {
        try {
            UsersStatus status = usersService.checkExistingUser(email, password);

            switch (status) {
                case SUCCESS:
                    Users user = usersService.getUser(email);
                    return ResponseEntity.ok("login ready" + user.role());
                case PASSWORD_MISMATCH:
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("password incorrect");
                case USER_NOT_FOUND:
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("user not found");
                default:
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("unexpected error occurred");

            }
        }catch(Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("unexpected error occurred");
        }

    }

    @GetMapping("/add-user")
    public ResponseEntity<String> addUser(@RequestParam("name") String name, @RequestParam("email") String email, @RequestParam("password") String password,@RequestParam("phone") String phone ,@RequestParam("role") String role){

        try{
            Users user = new Users(null, name, email, password, phone, LocalDateTime.now(), role);
            UsersStatus status = usersService.addUser(user);
            //UsersStatus status = usersService.addUser(username, email, passwordHash, firstName, lastName, roleId);

            switch (status){
                case SUCCESS:
                    return ResponseEntity.status(HttpStatus.CREATED).body("User added successfully");
                case USER_NOT_FOUND:
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("user not found");
                default:
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("unexpected error occurred");
            }
        }catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("unexpected error occurred");
        }
    }
}