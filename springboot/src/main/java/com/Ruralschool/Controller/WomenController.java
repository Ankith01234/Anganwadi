package com.Ruralschool.Controller;

import com.Ruralschool.Entity.Anganwadistaff;
import com.Ruralschool.Entity.Women;
import com.Ruralschool.Repository.AnganwadistaffRepository;
import com.Ruralschool.Repository.WomenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@RestController
@CrossOrigin("*")
public class WomenController
{
    @Autowired
    WomenRepository womenRepository;

    @Autowired
    AnganwadistaffRepository anganwadistaffRepository;

    @PostMapping("/addWomen/{id}")
    public ResponseEntity<?> addWomenVal(@RequestBody Women obj, @PathVariable String id)
    {
        Optional<Anganwadistaff> As=anganwadistaffRepository.findById(Integer.parseInt(id));
        if(As.isPresent())
        {
            Anganwadistaff anganwadistaff=As.get();
            Random rnd=new Random();
            int wid=rnd.nextInt(100000,999999);
            int password=rnd.nextInt(1000,9999);
            obj.setWomenid(wid);
            obj.setPassword(String.valueOf(password));
            obj.setWomenanganid(anganwadistaff.getAnganwadi());
            womenRepository.save(obj);
            return new ResponseEntity<>("Women added Successfully", HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Anganwadi Staff Id Mismatch",HttpStatus.OK);
    }

    @GetMapping("/getWomens/{id}")
    public ResponseEntity<?> getWomenVal(@PathVariable String id)
    {
        Optional<Anganwadistaff> As=anganwadistaffRepository.findById(Integer.parseInt(id));
        if(As.isPresent())
        {
            Anganwadistaff anganwadistaff=As.get();
            List<Women> womenLst=womenRepository.findByWomenanganidAid(anganwadistaff.getAnganwadi().getAid());
            return new ResponseEntity<>(womenLst,HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Anganwadi Staff Mismatch",HttpStatus.OK);
    }

    @PostMapping("/chkWomenId/{id}/{password}")
    public ResponseEntity<?> chkWomen(@PathVariable Integer id,@PathVariable String password)
    {
        Optional<Women> W=womenRepository.findById(id);
        if(W.isPresent())
        {
            Women women=W.get();
            if(women.getPassword().equals(password))
                return new ResponseEntity<>("Correct Password",HttpStatus.OK);
            else
                return new ResponseEntity<>("Incorrect Password",HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Women Id not found",HttpStatus.OK);
    }

}
