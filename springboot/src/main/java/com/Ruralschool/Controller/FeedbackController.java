package com.Ruralschool.Controller;

import com.Ruralschool.Entity.Feedback;
import com.Ruralschool.Entity.Women;
import com.Ruralschool.Repository.FeedbackRepository;
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
public class FeedbackController
{
    @Autowired
    FeedbackRepository feedbackRepository;

    @Autowired
    WomenRepository womenRepository;

    @PostMapping("/addFeedback/{id}")
    public ResponseEntity<?> addFeed(@RequestBody Feedback obj, @PathVariable String id)
    {
        Optional<Women> w=womenRepository.findById(Integer.parseInt(id));
        if(w.isPresent())
        {
            Women women=w.get();
            obj.setStatus("Pending");
            obj.setFeedBackAngan(women.getWomenanganid());
            obj.setFeedBackWomen(women);
            Date d=new Date();
            SimpleDateFormat dateFormat=new SimpleDateFormat("dd-MM-yyyy");
            String date=dateFormat.format(d);
            obj.setDate(date);
            feedbackRepository.save(obj);
            return new ResponseEntity<>("Feedback Saved Successfully", HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Women Id not Found",HttpStatus.OK);
    }

    @GetMapping("/getWomenFeedbackDetails/{id}")
    public ResponseEntity<?> getWomen(@PathVariable Integer id)
    {
        List<Feedback> lsts=feedbackRepository.findByFeedBackAnganAidAndStatus(id,"Pending");
        return new ResponseEntity<>(lsts,HttpStatus.OK);
    }

    @PutMapping("/feedbackStatus/{id}")
    public ResponseEntity<?> feedStatus(@PathVariable Integer id)
    {
        Optional<Feedback> F=feedbackRepository.findById(id);
        if(F.isPresent())
        {
            Feedback feedback=F.get();
            feedback.setStatus("Viewed");
            feedbackRepository.save(feedback);
            return new ResponseEntity<>("Status updated Successfully",HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Feed Back Id not found",HttpStatus.OK);
    }

}
