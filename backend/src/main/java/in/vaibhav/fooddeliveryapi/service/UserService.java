package in.vaibhav.fooddeliveryapi.service;

import in.vaibhav.fooddeliveryapi.io.UserRequest;
import in.vaibhav.fooddeliveryapi.io.UserResponse;

public interface UserService {


    UserResponse registerUser(UserRequest request);


    String findByUserId();
}
