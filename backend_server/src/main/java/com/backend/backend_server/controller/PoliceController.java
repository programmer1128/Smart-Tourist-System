package com.backend.backend_server.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/police")
public class PoliceController 
{

     @GetMapping("/dashboard")
     @PreAuthorize("hasRole('POLICE')")
     public ResponseEntity<String> getPoliceDashboard() 
     {
         return ResponseEntity.ok("Welcome, Officer. This is the Police Dashboard.");
     }
}