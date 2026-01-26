package in.vaibhav.fooddeliveryapi.controller;

import in.vaibhav.fooddeliveryapi.io.UserRequest;
import in.vaibhav.fooddeliveryapi.io.UserResponse;
import in.vaibhav.fooddeliveryapi.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api")

public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse register(@RequestBody UserRequest request){
        return userService.registerUser(request);


    }
}
