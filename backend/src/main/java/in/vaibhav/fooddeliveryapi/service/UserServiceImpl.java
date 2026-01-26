package in.vaibhav.fooddeliveryapi.service;

import in.vaibhav.fooddeliveryapi.entity.UserEntity;
import in.vaibhav.fooddeliveryapi.io.UserRequest;
import in.vaibhav.fooddeliveryapi.io.UserResponse;
import in.vaibhav.fooddeliveryapi.repository.UserRepository;
import lombok.AllArgsConstructor;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserServiceImpl  implements UserService{

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationFacade authenticationFacade;

    @Override
    public UserResponse registerUser(UserRequest request) {
        UserEntity newUser=convertToEntity(request);
        newUser=userRepository.save(newUser);
        return convertToResponse(newUser);
    }

    @Override
    public String findByUserId() {
        String loggdInUserEmail=authenticationFacade.getAuthentication().getName();
        UserEntity loggedInUser= userRepository.findByEmail(loggdInUserEmail).orElseThrow(()->new UsernameNotFoundException("User not found"));
        return loggedInUser.getId();




    }

    private UserEntity convertToEntity(UserRequest request){
        return UserEntity.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .name(request.getName())
                .build();

    }
    private UserResponse convertToResponse(UserEntity registeredUser){
        return UserResponse.builder()
                .id(registeredUser.getId())
                .name(registeredUser.getName())
                .email(registeredUser.getEmail())
                .build();

    }
}

