package com.Ruralschool.Controller;

import com.Ruralschool.DTO.EmailData;
import com.Ruralschool.Entity.Anganwadi;
import com.Ruralschool.Entity.Anganwadistaff;
import com.Ruralschool.Entity.Village;
import com.Ruralschool.Repository.AnganwadiRepository;
import com.Ruralschool.Repository.AnganwadistaffRepository;
import com.Ruralschool.Repository.VillageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
public class AnganwadiController
{
    @Autowired
    AnganwadiRepository anganwadiRepository;

    @Autowired
    VillageRepository villageRepository;

    @Autowired
    AnganwadistaffRepository anganwadistaffRepository;

    @PostMapping("/addAnganwadi/{vid}")
    public ResponseEntity<?> addAnganVal(@RequestBody Anganwadi obj, @PathVariable Integer vid)
    {
        Optional<Anganwadi> A=anganwadiRepository.findByAname(obj.getAname());
        if(A.isPresent())
            return new ResponseEntity<>("Anganwadi Name already Exists",HttpStatus.OK);
        else
        {
            Optional<Village> V = villageRepository.findById(vid);
            if (V.isPresent())
            {
                Village village = V.get();
                obj.setVillage(village);
                obj.setBalance(0);
                anganwadiRepository.save(obj);
                return new ResponseEntity<>("Anganwadi Added successfully", HttpStatus.OK);
            }
            else
                return new ResponseEntity<>("Village Not found", HttpStatus.OK);
        }
    }

    @GetMapping("/getAllAngan")
    public ResponseEntity<?> getAngan(@PathVariable String id)
    {
        List<Anganwadi> A=anganwadiRepository.findAll();
        return new ResponseEntity<>(A,HttpStatus.OK);
    }

    @GetMapping("/getParticularAngan/{id}")
    public ResponseEntity<?> getParticularAnganwadi(@PathVariable String id)
    {
        List<Anganwadi> A=anganwadiRepository.findByVillageGrampanchayatId(Integer.parseInt(id));
        return new ResponseEntity<>(A,HttpStatus.OK);
    }

    @PutMapping("/addBalance/{aid}/{amount}")
    public ResponseEntity<?> addAmmountToAngan(@PathVariable Integer aid,@PathVariable Integer amount) {
        Optional<Anganwadi> A = anganwadiRepository.findById(aid);
        if (A.isPresent()) {
            Anganwadi anganwadi = A.get();
            anganwadi.setBalance(anganwadi.getBalance() + amount);
            anganwadiRepository.save(anganwadi);
            return new ResponseEntity<>("Amount Added successfully", HttpStatus.OK);
        } else
            return new ResponseEntity<>("Angan Id Mismatch", HttpStatus.OK);
    }

    @PutMapping("/reduceBalance/{id}/{amount}")
    public ResponseEntity<?> reduceAmount(@PathVariable String id,@PathVariable Integer amount)
    {
        Optional<Anganwadistaff> As=anganwadistaffRepository.findById(Integer.parseInt(id));
        if(As.isPresent())
        {
            Anganwadistaff anganwadistaff=As.get();
            Optional<Anganwadi>A=anganwadiRepository.findById(anganwadistaff.getAnganwadi().getAid());
            if(A.isPresent())
            {
                Anganwadi anganwadi=A.get();
                if(anganwadi.getBalance()-amount>=0)
                {
                    anganwadi.setBalance(anganwadi.getBalance()-amount);
                    anganwadiRepository.save(anganwadi);
                    return new ResponseEntity<>("Anganwadi can buy the Expenditure",HttpStatus.OK);
                }
                else
                    return new ResponseEntity<>("Insufficient Balance",HttpStatus.OK);
            }
            else
                return new ResponseEntity<>("Anganwadi not found",HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Anganwadi Staff Id Mismatch",HttpStatus.OK);
    }

}

