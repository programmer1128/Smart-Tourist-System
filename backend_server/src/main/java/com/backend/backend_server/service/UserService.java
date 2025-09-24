package com.backend.backend_server.service;

import com.backend.backend_server.DataTransferObjects.RegistrationRequest;
import com.backend.backend_server.entity.Role;
import com.backend.backend_server.entity.User;
import com.backend.backend_server.repository.RoleRepository;
import com.backend.backend_server.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Set;

@Service
public class UserService 
{

     private final UserRepository userRepository;
     private final RoleRepository roleRepository;
     private final PasswordEncoder passwordEncoder;

     public UserService(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) 
     {
         this.userRepository = userRepository;
         this.roleRepository = roleRepository;
         this.passwordEncoder = passwordEncoder;
     }

     // THIS METHOD IS FOR NEW USER REGISTRATION
     public User registerNewUser(RegistrationRequest registrationRequest) 
     {
         if (userRepository.findByUsername(registrationRequest.username()).isPresent()) 
         {
             throw new IllegalStateException("Username already exists");
         }

         User newUser = new User();
         newUser.setUsername(registrationRequest.username());
         newUser.setPassword(passwordEncoder.encode(registrationRequest.password()));
         newUser.setEnabled(true);

         // Assign a default "TOURIST" role
         Role defaultRole = roleRepository.findByName("TOURIST")
             .orElseThrow(() -> new RuntimeException("Error: Default role TOURIST not found."));
             newUser.setRoles(Set.of(defaultRole));

         return userRepository.save(newUser);
     }

     // THIS METHOD IS FOR THE ADMIN TO CHANGE ROLES
     @Transactional
     public void changeUserRole(String username, String newRoleName) 
     {
         User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found: " + username));

         Role newRole = roleRepository.findByName(newRoleName)
                .orElseThrow(() -> new RuntimeException("Role not found: " + newRoleName));

         user.getRoles().clear();
         user.getRoles().add(newRole);
     }
}