package com.Ruralschool.Controller;

import com.Ruralschool.Entity.Anganwadistaff;
import com.Ruralschool.Entity.Baby;
import com.Ruralschool.Entity.VaccineDetails;
import com.Ruralschool.Repository.AnganwadistaffRepository;
import com.Ruralschool.Repository.BabyRepository;
import com.Ruralschool.Repository.VaccineDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.xml.crypto.Data;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
public class VaccineDetailsController
{
    @Autowired
    VaccineDetailsRepository vaccineDetailsRepository;

    @Autowired
    BabyRepository babyRepository;

    @Autowired
    AnganwadistaffRepository anganwadistaffRepository;

    @PostMapping("/addVaccine/{staffid}/{babyid}")
    public ResponseEntity<?> addVaccineVal(@RequestBody VaccineDetails obj, @PathVariable String staffid,@PathVariable Integer babyid)
    {
        Optional<Anganwadistaff> As=anganwadistaffRepository.findById(Integer.parseInt(staffid));
        Optional<Baby> B=babyRepository.findById(babyid);
        if(As.isPresent() && B.isPresent())
        {
            Anganwadistaff anganwadistaff=As.get();
            Baby baby=B.get();
            obj.setBaby(baby);
            obj.setVaccinestaff(anganwadistaff);
            obj.setStatus("Provided");
            Date d=new Date();
            SimpleDateFormat dateFormat=new SimpleDateFormat("dd-MM-yyyy");
            String date=dateFormat.format(d);
            obj.setDate(date);
            vaccineDetailsRepository.save(obj);
            return new ResponseEntity<>("Vaccine is Provided to Baby", HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Staff or Baby Id Mismatch",HttpStatus.OK);
    }

    @GetMapping("/getBabyVaccine/{id}")
    public ResponseEntity<?> getBabyVaccineDetails(@PathVariable Integer id)
    {
        Optional<Baby> B=babyRepository.findById(id);
        if(B.isPresent())
        {
            List<VaccineDetails> lst=vaccineDetailsRepository.findByBabyBabyid(id);
            return new ResponseEntity<>(lst,HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Baby Id Mismatch",HttpStatus.OK);
    }

    @GetMapping("/getVaccineBasedOnBaby/{id}")
    public ResponseEntity<?> getVaccineDetails(@PathVariable String id)
    {
        List<VaccineDetails> lists=vaccineDetailsRepository.findByBabyBabywomen(Integer.parseInt(id));
        return new ResponseEntity<>(lists,HttpStatus.OK);
    }

    @PutMapping("/vaccineStatusUpdate/{id}")
    public ResponseEntity<?> statusUpdate(@PathVariable Integer id)
    {
        Optional<VaccineDetails> v=vaccineDetailsRepository.findById(id);
        if(v.isPresent())
        {
            VaccineDetails vaccineDetails=v.get();
            vaccineDetails.setStatus("Received");
            vaccineDetailsRepository.save(vaccineDetails);
            return new ResponseEntity<>("Status updated Successfully",HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Vaccine Id Mismatch",HttpStatus.OK);
    }

    @GetMapping("/getVaccineBasedOnAngan/{id}")
    public ResponseEntity<?> getVaccDetails(@PathVariable Integer id)
    {
        List<VaccineDetails> lists=vaccineDetailsRepository.findByVaccinestaffAnganwadiAid(id);
        return new ResponseEntity<>(lists,HttpStatus.OK);
    }

}
