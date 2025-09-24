package com.backend.backend_server.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/tourist")
public class TouristController 
{

     @GetMapping("/attractions")
     @PreAuthorize("hasRole('TOURIST')") // Ensures only tourists can access
     public ResponseEntity<String> getTouristAttractions() 
     {
         return ResponseEntity.ok("Welcome, tourist! Here are the top attractions.");
     }
}