package com.Ruralschool.Controller;

import com.Ruralschool.Entity.Grampanchayat;
import com.Ruralschool.Entity.Village;
import com.Ruralschool.Repository.GrampanchayatRepository;
import com.Ruralschool.Repository.VillageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
public class VillageController
{

    @Autowired
    VillageRepository villageRepository;

    @Autowired
    GrampanchayatRepository grampanchayatRepository;

    @PostMapping("/addVillage/{gpid}/{villagename}")
    public ResponseEntity<?> addVillageVal(@PathVariable Integer gpid,@PathVariable String villagename)
    {
        Optional<Village> V=villageRepository.findByVillagename(villagename);
        if(V.isPresent())
            return new ResponseEntity<>("Village Name Aleady Exists",HttpStatus.OK);
        else
        {
            Optional<Grampanchayat> Gp = grampanchayatRepository.findById(gpid);
            if (Gp.isPresent())
            {
                Grampanchayat grampanchayat = Gp.get();
                Village village = new Village();
                village.setGrampanchayat(grampanchayat);
                village.setVillagename(villagename);
                villageRepository.save(village);
                return new ResponseEntity<>("Village Name added successfuly", HttpStatus.OK);
            }
            else
                return new ResponseEntity<>("Gram Panchayat Id Mismatch", HttpStatus.OK);
        }
    }

    @GetMapping("/getAllVillage")
    public ResponseEntity<?> getVillageVal()
    {
        List<Village> villageList=villageRepository.findAll();
        return new ResponseEntity<>(villageList,HttpStatus.OK);
    }

    @GetMapping("/getParticularVillage/{id}")
    public ResponseEntity<?> getVillage(@PathVariable String id)
    {
        Optional<Grampanchayat> Gp=grampanchayatRepository.findById(Integer.parseInt(id));
        if(Gp.isPresent())
        {
            List<Village> villgelst=villageRepository.findByvillage(Integer.parseInt(id));
            return new ResponseEntity<>(villgelst,HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Gram Panchayat Id Mismatch",HttpStatus.OK);
    }

}
