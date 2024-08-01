package com.Ruralschool.Controller;

import com.Ruralschool.Entity.Admin;
import com.Ruralschool.Repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@CrossOrigin("*")
public class AdminController
{
    @Autowired
    AdminRepository adminRepository;

    @PostMapping("/chkAdminLogin")
    public ResponseEntity<?> chkLoginDetails(@RequestBody Admin obj)
    {
        Optional<Admin> L=adminRepository.findById(obj.getId());
        if(L.isPresent())
        {
            Admin admin=L.get();
            if(admin.getPassword().equals(obj.getPassword()))
                return new ResponseEntity<>("Login Successfully", HttpStatus.OK);
            else
                return new ResponseEntity<>("Either Id or Password Mismatch",HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("You Don't have Permission to create an Account",HttpStatus.OK);
    }

}
