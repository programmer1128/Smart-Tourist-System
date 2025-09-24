package com.backend.backend_server.entity;

import java.util.Objects;
import jakarta.persistence.*;

@Entity
@Table(name = "roles")
public class Role 
{

     @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
     private Long id;

     @Column(unique = true, nullable = false)
     private String name;

     public Role() {}
     public Role(String name) { this.name = name; }

     // Getters and Setters...
     public Long getId() { return id; }
     public void setId(Long id) { this.id = id; }
     public String getName() { return name; }
     public void setName(String name) { this.name = name; }

     @Override
     public boolean equals(Object o) 
     {
         if (this == o) return true;
         if (o == null || getClass() != o.getClass()) return false;
         Role role = (Role) o;
         return Objects.equals(id, role.id);
     }

     @Override
     public int hashCode() 
     {
         return Objects.hash(id);
     }
}