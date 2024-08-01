package com.Ruralschool.Controller;

import com.Ruralschool.Entity.Anganwadistaff;
import com.Ruralschool.Entity.Baby;
import com.Ruralschool.Entity.Women;
import com.Ruralschool.Repository.AnganwadistaffRepository;
import com.Ruralschool.Repository.BabyRepository;
import com.Ruralschool.Repository.WomenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
public class BabyController
{
    @Autowired
    BabyRepository babyRepository;

    @Autowired
    WomenRepository womenRepository;

    @Autowired
    AnganwadistaffRepository anganwadistaffRepository;

    @PostMapping("/addBaby/{womenid}")
    public ResponseEntity<?> addBaby(@RequestBody Baby obj, @PathVariable Integer womenid)
    {
        Optional<Women> W=womenRepository.findById(womenid);
        if(W.isPresent())
        {
            Women women=W.get();
            obj.setBabywomen(women);
            babyRepository.save(obj);
            return new ResponseEntity<>("Baby Added Successfully", HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Women Id Mismatch",HttpStatus.OK);
    }

    @GetMapping("/getAllBaby")
    public ResponseEntity<?> getBaby()
    {
        List<Baby> babyList=babyRepository.findAll();
        return new ResponseEntity<>(babyList,HttpStatus.OK);
    }

    @GetMapping("/getBabyBasedOnWomen/{womenid}")
    public ResponseEntity<?> getBabyOnWomen(@PathVariable Integer womenid)
    {
        Optional<Women> W=womenRepository.findById(womenid);
        if(W.isPresent())
        {
            List<Baby> lst=babyRepository.findByBabywomenWomenid(womenid);
            return new ResponseEntity<>(lst,HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Women Id Mismatch",HttpStatus.OK);
    }

}
