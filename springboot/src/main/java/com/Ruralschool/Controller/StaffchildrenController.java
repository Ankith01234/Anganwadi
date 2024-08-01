package com.Ruralschool.Controller;

import com.Ruralschool.Entity.Anganwadistaff;
import com.Ruralschool.Entity.Staffchildren;
import com.Ruralschool.Repository.AnganwadistaffRepository;
import com.Ruralschool.Repository.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin("*")
public class StaffchildrenController {
    @Autowired
    StaffRepository staffRepository;

    @Autowired
    AnganwadistaffRepository anganwadistaffRepository;

    @GetMapping("/getAnganNameDetails/{id}")
    public ResponseEntity<?> getDetails(@PathVariable String id) {
        Optional<Anganwadistaff> L = anganwadistaffRepository.findById(Integer.parseInt(id));
        if (L.isPresent()) {
            String Staffname = anganwadistaffRepository.findByAnganwadiname(Integer.parseInt(id));
            return new ResponseEntity<>(Staffname, HttpStatus.OK);
        } else
            return new ResponseEntity<>("Anganwadi Staff Mismatch", HttpStatus.OK);
    }

    @PostMapping("/addChildrens/{id}")
    public ResponseEntity<?> addChild(@RequestBody Staffchildren obj, @PathVariable String id) {
        Optional<Anganwadistaff> L = anganwadistaffRepository.findById(Integer.parseInt(id));
        if (L.isPresent()) {
            Anganwadistaff anganwadistaff = L.get();
            obj.setAnganwadistaff(anganwadistaff);
            staffRepository.save(obj);
            return new ResponseEntity<>("Childrens added successfully", HttpStatus.OK);
        } else
            return new ResponseEntity<>("Staff Id not found", HttpStatus.OK);
    }

    @GetMapping("/getChildrens/{id}")
    public ResponseEntity<?> getChildrens(@PathVariable String id) {
        Optional<Anganwadistaff> As = anganwadistaffRepository.findById(Integer.parseInt(id));
        if (As.isPresent())
        {
            Staffchildren staffchildren = staffRepository.findByAnganwadistaffId(Integer.parseInt(id));
            return new ResponseEntity<>(staffchildren, HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Staff Id Mismatch", HttpStatus.OK);
    }

}
