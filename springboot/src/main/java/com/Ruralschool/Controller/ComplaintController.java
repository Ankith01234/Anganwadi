package com.Ruralschool.Controller;

import com.Ruralschool.Entity.Complaint;
import com.Ruralschool.Entity.Women;
import com.Ruralschool.Repository.ComplaintRepository;
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
public class ComplaintController
{
    @Autowired
    ComplaintRepository complaintRepository;

    @Autowired
    WomenRepository womenRepository;

    @PostMapping("/addComplaint/{id}")
    public ResponseEntity<?> addComplaintToAnganwadi(@RequestBody Complaint obj, @PathVariable String id)
    {
        Optional<Women> w=womenRepository.findById(Integer.parseInt(id));
        if(w.isPresent())
        {
            Women women=w.get();
            obj.setCompainAngan(women.getWomenanganid());
            obj.setStatus("Pending");
            obj.setComplainwomen(women);
            Date d=new Date();
            SimpleDateFormat dateFormat=new SimpleDateFormat("dd-MM-yyyy");
            String date=dateFormat.format(d);
            obj.setDate(date);
            complaintRepository.save(obj);
            return new ResponseEntity<>("Complaint added successfully", HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Women Id Not Found",HttpStatus.OK);
    }

    @GetMapping("/getWomenComplaintDetails/{id}")
    public ResponseEntity<?> getwomendetails(@PathVariable Integer id)
    {
        List<Complaint> complaintList=complaintRepository.findByCompainAnganAidAndStatus(id,"Pending");
        return new ResponseEntity<>(complaintList,HttpStatus.OK);
    }

    @PutMapping("/updateComplaintStatus/{id}")
    public ResponseEntity<?> updateStatus(@PathVariable Integer id)
    {
        Optional<Complaint> C=complaintRepository.findById(id);
        if(C.isPresent())
        {
            Complaint complaint=C.get();
            complaint.setStatus("Viewed");
            complaintRepository.save(complaint);
            return new ResponseEntity<>("Status updated successfully",HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Complaint Id not found",HttpStatus.OK);
    }

}
