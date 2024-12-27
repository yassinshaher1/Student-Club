package com.student.club.services;

import com.student.club.records.Users;
import com.student.club.repositories.UsersRepo;
import com.student.club.status.UsersStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UsersService {

    private final UsersRepo usersRepo;

    @Autowired
    public UsersService(UsersRepo usersRepository) {
        this.usersRepo = usersRepository;
    }

    public UsersStatus checkExistingUser(String email, String password) {
        try {
            Optional<Users> existingUser = usersRepo.selectByEmail(email);

            if (existingUser.isPresent()) {
                if ((existingUser.get().password()).equals(password)) {
                    return UsersStatus.SUCCESS;
                } else {
                    return UsersStatus.PASSWORD_MISMATCH;
                }
            } else {
                return UsersStatus.USER_NOT_FOUND;
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return UsersStatus.USER_NOT_FOUND;
        }
    }

    public Users getUser(String email) {
        Optional<Users> user = usersRepo.selectByEmail(email);
        return user.orElse(null);
    }

    public UsersStatus addUser(Users user) {
        try {
            usersRepo.save(new Users(null, user.name(), user.email(), user.password(), user.phone(), LocalDateTime.now(), user.role()));
            return UsersStatus.SUCCESS;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return UsersStatus.CANNOT_ADD_USER;
        }
    }
}
