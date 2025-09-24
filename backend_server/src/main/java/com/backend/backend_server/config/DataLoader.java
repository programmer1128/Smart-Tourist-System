package com.backend.backend_server.config;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.backend.backend_server.entity.Role;
import com.backend.backend_server.entity.User;
import com.backend.backend_server.repository.RoleRepository;
import com.backend.backend_server.repository.UserRepository;

@Component
public class DataLoader implements CommandLineRunner 
{

     @Autowired
     private RoleRepository roleRepo;

     @Autowired
     private UserRepository userRepo;

     @Autowired
     private PasswordEncoder encoder;

     @Override
     public void run(String... args) throws Exception 
     {
         // Check if roles already exist
         if(roleRepo.count() == 0) 
         {
             // Create fixed roles
             Role touristRole = roleRepo.save(new Role("TOURIST"));
             Role policeRole = roleRepo.save(new Role("POLICE"));
             Role tourismDeptRole = roleRepo.save(new Role("TOURISM_DEPARTMENT"));

             // Create one initial user per role for testing
             User touristUser = new User();
             touristUser.setUsername("tourist1");
             touristUser.setPassword(encoder.encode("tourist123"));
             touristUser.setRoles(Set.of(touristRole));
             userRepo.save(touristUser);

             User policeUser = new User();
             policeUser.setUsername("police1");
             policeUser.setPassword(encoder.encode("police123"));
             policeUser.setRoles(Set.of(policeRole));
             userRepo.save(policeUser);

             User deptUser = new User();
             deptUser.setUsername("dept1");
             deptUser.setPassword(encoder.encode("dept123"));
             deptUser.setRoles(Set.of(tourismDeptRole));
             userRepo.save(deptUser);

             System.out.println("Default roles and initial users created!");
         }
     }
}
