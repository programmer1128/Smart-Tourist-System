package com.backend.backend_server.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class TestController 
{
     @GetMapping("/tourist/home")
     public String touristHome()
     {
         return "Tourist Dashboard";
     }   

     @GetMapping("/police/home")
     public String policeHome()
     {
         return "Police Dashboard";
     }

     @GetMapping("/admin/home")
     public String adminHome()
     {
         return "Welcome admin";
     }
     
}
