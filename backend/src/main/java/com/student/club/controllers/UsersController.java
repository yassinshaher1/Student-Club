package com.student.club.controllers;

import com.student.club.records.UpdateUserDTO;
import com.student.club.records.Users;
import com.student.club.repositories.UsersRepo;
import com.student.club.services.UsersService;
import com.student.club.status.UsersStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000")
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
    public ResponseEntity<?> login(@RequestParam("email") String email,
                                        @RequestParam("password") String password) {
        try {
            UsersStatus status = usersService.checkExistingUser(email, password);

            switch (status) {
                case SUCCESS:
                    Users user = usersService.getUser(email);
                    Map<String, Object> response = new HashMap<>();
                    response.put("message", "login successful");
                    response.put("role", user.role());
//                    System.out.println("successful" + response);
                    return ResponseEntity.ok(response);
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
    public ResponseEntity<String> addUser(@RequestParam("name") String name, @RequestParam("email") String email, @RequestParam("password") String password,@RequestParam("phone") String phone){

        try{
            Users user = new Users(null, name, email, password, phone, LocalDateTime.now(), "member");
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

    @PatchMapping("/update-user")
    public ResponseEntity<?> updateUser(@RequestParam("email") String email, @RequestBody UpdateUserDTO updates){
        try{
            UsersStatus status = usersService.updateUser(email, updates);

            switch (status){
                case SUCCESS:
                    return ResponseEntity.ok("User updated successfully");
                case USER_NOT_FOUND:
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
                default:
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unexpected error occurred");
            }
        }catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unexpected error occurred");
        }

    }

    @GetMapping("/delete-user")
    public ResponseEntity<?> deleteUser(@RequestParam("email") String email){
        try{
            UsersStatus status = usersService.deleteUser(email);

            switch (status){
                case SUCCESS:
                    return ResponseEntity.ok("User deleted successfully");
                case USER_NOT_FOUND:
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
                default:
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unexpected error occurred");
            }
        }catch (Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unexpected error occurred");
        }
    }

    @GetMapping("/list-users")
    public List<Users> getAllUsers(){
        return usersService.getAllUsers();
    }
}
