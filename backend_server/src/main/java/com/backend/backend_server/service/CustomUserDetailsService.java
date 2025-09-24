package com.backend.backend_server.service;

import com.backend.backend_server.entity.User;
import com.backend.backend_server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException 
    {
         // --- LOGGING START ---
         System.out.println("--- Attempting to load user by username: " + username + " ---");

         User user = userRepo.findByUsername(username)
                .orElseThrow(() -> {
                    // This log will appear if the user is not found
                    System.out.println("!!! FAILED to find user: " + username + " in the database.");
                    return new UsernameNotFoundException("User not found: " + username);
                });

         // This log will appear if the user is found
         System.out.println(">>> Successfully found user: " + user.getUsername());
         System.out.println(">>> Password hash from DB: " + user.getPassword());

         Set<GrantedAuthority> authorities = user.getRoles().stream()
                .map(role -> 
                 {
                     // Log each role as it's being processed
                     System.out.println(">>> Assigning role: ROLE_" + role.getName());
                     return new SimpleGrantedAuthority("ROLE_" + role.getName());
                 })
                .collect(Collectors.toSet());
        
         System.out.println("--- Finished loading user. Handing off to Spring Security. ---");
        // --- LOGGING END ---

         return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                authorities
         );
     }
}