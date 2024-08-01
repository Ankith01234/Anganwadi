package com.Ruralschool.Controller;

import com.Ruralschool.Entity.Anganwadistaff;
import com.Ruralschool.Entity.FoodExpenditure;
import com.Ruralschool.Repository.AnganwadistaffRepository;
import com.Ruralschool.Repository.FoodExpenditureRepository;
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
public class FoodExpenditureController
{
    @Autowired
    FoodExpenditureRepository foodExpenditureRepository;

    @Autowired
    AnganwadistaffRepository anganwadistaffRepository;

    @PostMapping("/addFood/{id}")
    public ResponseEntity<?> addFoodItem(@RequestBody FoodExpenditure obj, @PathVariable String id)
    {
        Optional<Anganwadistaff> As=anganwadistaffRepository.findById(Integer.parseInt(id));
        if(As.isPresent())
        {
            Anganwadistaff anganwadistaff=As.get();
            Date d=new Date();
            SimpleDateFormat dateFormat=new SimpleDateFormat("dd-MM-yyyy");
            String date=dateFormat.format(d);
            obj.setDate(date);
            obj.setAnganwadiobj(anganwadistaff.getAnganwadi());
            foodExpenditureRepository.save(obj);
            return new ResponseEntity<>("FoodItem added Successfully", HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Anganwadi Staff Id Mismatch",HttpStatus.OK);
    }

    @GetMapping("/getFoodItems/{id}")
    public ResponseEntity<?> foodItem(@PathVariable String id)
    {
        Optional<Anganwadistaff> As=anganwadistaffRepository.findById(Integer.parseInt(id));
        if(As.isPresent())
        {
            Anganwadistaff anganwadistaff=As.get();
            List<FoodExpenditure> lists=foodExpenditureRepository.findByAnganwadiobjAid(anganwadistaff.getAnganwadi().getAid());
            return new ResponseEntity<>(lists,HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Anganwadi Staff Id Mismatch",HttpStatus.OK);
    }

    @GetMapping("/getTransactionDetails/{id}")
    public ResponseEntity<?> getDetails(@PathVariable Integer id)
    {
        List<FoodExpenditure> list=foodExpenditureRepository.findByAnganwadiobjAid(id);
        return new ResponseEntity<>(list,HttpStatus.OK);
    }

}
