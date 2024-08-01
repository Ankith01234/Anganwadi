package com.Ruralschool.Controller;

import com.Ruralschool.Entity.Anganwadistaff;
import com.Ruralschool.Entity.NutritionItems;
import com.Ruralschool.Entity.Women;
import com.Ruralschool.Repository.AnganwadistaffRepository;
import com.Ruralschool.Repository.NutritionItemsRepository;
import com.Ruralschool.Repository.WomenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
public class NutritionItemsController
{
    @Autowired
    NutritionItemsRepository nutritionItemsRepository;

    @Autowired
    AnganwadistaffRepository anganwadistaffRepository;

    @Autowired
    WomenRepository womenRepository;

    @PostMapping("/addNutrition/{id}/{womenid}")
    public ResponseEntity<?> addNutritionVal(@RequestBody NutritionItems obj, @PathVariable String id, @PathVariable Integer womenid)
    {
        Optional<Anganwadistaff> As=anganwadistaffRepository.findById(Integer.parseInt(id));
        Optional<Women> W=womenRepository.findById(womenid);
        if(As.isPresent() && W.isPresent())
        {
            Anganwadistaff anganwadistaff=As.get();
            Women women=W.get();
            obj.setWomen(women);
            obj.setNutritionstaff(anganwadistaff);
            obj.setStatus("Provided");
            Date d=new Date();
            SimpleDateFormat dateFormat=new SimpleDateFormat("dd-MM-yyyy");
            String date=dateFormat.format(d);
            obj.setDate(date);
            nutritionItemsRepository.save(obj);
            return new ResponseEntity<>("Nutrition Provided Successfully", HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Women or Anganwadi Staff Id Mismatch",HttpStatus.OK);
    }

    @GetMapping("/getNutrition/{id}")
    public ResponseEntity<?> getNutritionVal(@PathVariable String id)
    {
        List<NutritionItems> lst=nutritionItemsRepository.findByNutritionstaffId(Integer.parseInt(id));
        return new ResponseEntity<>(lst,HttpStatus.OK);
    }

    @GetMapping("/getNutritionBasedOnWomen/{id}")
    public ResponseEntity<?> getNut(@PathVariable String id)
    {
        Optional<NutritionItems> N=nutritionItemsRepository.findByWomenWomenid(Integer.parseInt(id));
        if(N.isPresent())
        {
            List<NutritionItems> lists=nutritionItemsRepository.findByAllNutrition(Integer.parseInt(id));
            return new ResponseEntity<>(lists,HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("This women doesn't got any Nutriton items",HttpStatus.OK);
    }

    @PutMapping("/nutritionStatusUpdate/{id}")
    public ResponseEntity<?> upDateStatus(@PathVariable Integer id)
    {
        Optional<NutritionItems> N=nutritionItemsRepository.findById(id);
        if(N.isPresent())
        {
            NutritionItems nutritionItems=N.get();
            nutritionItems.setStatus("Received");
            nutritionItemsRepository.save(nutritionItems);
            return new ResponseEntity<>("Status Updated Successfully",HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Nutrition Id not found",HttpStatus.OK);
    }

    @GetMapping("/getNutritionsById/{id}")
    public ResponseEntity<?> getNut(@PathVariable Integer id)
    {
        List<NutritionItems> lists=nutritionItemsRepository.findByWomenWomenanganidAid(id);
        return new ResponseEntity<>(lists,HttpStatus.OK);
    }

}
