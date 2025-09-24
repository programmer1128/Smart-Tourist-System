package com.backend.backend_server.controller;

import com.backend.backend_server.DataTransferObjects.RoleChangeRequest;
import com.backend.backend_server.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class SecureAdminController 
{

     private final UserService userService;

     public SecureAdminController(UserService userService) 
     {
         this.userService = userService;
     }

     @PutMapping("/users/{username}/role")
     public ResponseEntity<String> updateUserRole(@PathVariable String username, @RequestBody RoleChangeRequest roleChangeRequest) 
     {
         try 
         {
             userService.changeUserRole(username, roleChangeRequest.roleName());
             return ResponseEntity.ok("User role updated successfully for " + username);
         } 
         catch (RuntimeException e) 
         {
             return ResponseEntity.badRequest().body(e.getMessage());
         }
     }
}