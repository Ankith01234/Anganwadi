package com.Ruralschool.Controller;

import com.Ruralschool.Entity.District;
import com.Ruralschool.Entity.Taluk;
import com.Ruralschool.Repository.DistrictRepository;
import com.Ruralschool.Repository.TalukRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
public class TalukController
{
    @Autowired
    TalukRepository talukRepository;

    @Autowired
    DistrictRepository districtRepository;

    @PostMapping("/addTaluk/{districtid}/{talukname}")
    public ResponseEntity<?> addTalukToDistrict(@PathVariable Integer districtid,@PathVariable String talukname)
    {
        Optional<Taluk> L=talukRepository.findByTalukname(talukname);
        if(L.isPresent())
            return new ResponseEntity<>("Taluk Name Already Exists",HttpStatus.OK);
        else
        {
            Optional<District> D=districtRepository.findById(districtid);
            if(D.isPresent())
            {
                District district=D.get();
                Taluk taluk=new Taluk();
                taluk.setTalukname(talukname);
                taluk.setDistrict(district);
                talukRepository.save(taluk);
                return new ResponseEntity<>("Taluk added successfully", HttpStatus.OK);
            }
            else
                return new ResponseEntity<>("District Not Found",HttpStatus.OK);
        }
    }

    @GetMapping("/getAllTaluks")
    public ResponseEntity<?> getAllTaluks()
    {
        List<Taluk> taluklst=talukRepository.findAll();
        return new ResponseEntity<>(taluklst,HttpStatus.OK);
    }

}
