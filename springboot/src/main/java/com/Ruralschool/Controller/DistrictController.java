package com.Ruralschool.Controller;

import com.Ruralschool.Entity.District;
import com.Ruralschool.Repository.DistrictRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
public class DistrictController
{
    @Autowired
    DistrictRepository districtRepository;

    @PostMapping("/addDistrict/{districtname}")
    public ResponseEntity<?> addDistrictVal(@PathVariable String districtname)
    {
        Optional<District> L=districtRepository.findByDistrictname(districtname);
        if(L.isPresent())
            return new ResponseEntity<>("District Name Already Exists", HttpStatus.OK);
        else
        {
            District district=new District();
            district.setDistrictname(districtname);
            districtRepository.save(district);
            return new ResponseEntity<>("District Name Added Successfully",HttpStatus.OK);
        }
    }

    @GetMapping("/getAllDistricts")
    public ResponseEntity<?> getDistricts()
    {
        List<District> lists=districtRepository.findAll();
        return new ResponseEntity<>(lists,HttpStatus.OK);
    }

}
