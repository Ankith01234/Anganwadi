package com.Ruralschool.Controller;

import com.Ruralschool.DTO.EmailData;
import com.Ruralschool.Entity.Anganwadi;
import com.Ruralschool.Entity.Anganwadistaff;
import com.Ruralschool.Entity.Grampanchayat;
import com.Ruralschool.Repository.AnganwadiRepository;
import com.Ruralschool.Repository.AnganwadistaffRepository;
import com.Ruralschool.Repository.GrampanchayatRepository;
import com.Ruralschool.Smtp.Smtpserviceclass;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@RestController
@CrossOrigin("*")
public class AnganwadistaffController
{
    @Autowired
    AnganwadistaffRepository anganwadistaffRepository;

    @Autowired
    AnganwadiRepository anganwadiRepository;

    @Autowired
    Smtpserviceclass smtpserviceclass;

    @Autowired
    GrampanchayatRepository grampanchayatRepository;

    @PostMapping("/addStaff/{aid}")
    public ResponseEntity<?> addStaffVal(@RequestBody Anganwadistaff obj, @PathVariable Integer aid)
    {
        Optional<Anganwadistaff> As=anganwadistaffRepository.findByStaffemail(obj.getStaffemail());
        if(As.isPresent())
            return new ResponseEntity<>("Staff Already Exists", HttpStatus.ALREADY_REPORTED);
        else
        {
            Optional<Anganwadi> A=anganwadiRepository.findById(aid);
            if(A.isPresent())
            {
                Anganwadi anganwadi=A.get();
                Random rnd=new Random();
                int id=rnd.nextInt(100000,999999);
                int password=rnd.nextInt(1000,9999);
                obj.setId(id);
                obj.setPassword(String.valueOf(password));
                obj.setAnganwadi(anganwadi);

                EmailData emailData=new EmailData();
                emailData.setRecepient(obj.getStaffemail());
                emailData.setSubject("Login Credentails");
                String txt="Congrajulations you have got appointment as Anganwadi staff your Id: "+id+" Password: "+password;
                emailData.setMessage(txt);

                String msg=smtpserviceclass.sendMail(emailData);

                if(msg.equals("Mail Sent Successfully"))
                {
                    anganwadistaffRepository.save(obj);
                    return new ResponseEntity<>("Staff Added successfully", HttpStatus.OK);
                }
                else
                    return new ResponseEntity<>(msg,HttpStatus.OK);

            }
            else
                return new ResponseEntity<>("Anganwadi not found",HttpStatus.OK);
        }

    }

    @GetMapping("/getAnganStaff")
    public ResponseEntity<?> getAllStaff()
    {
        List<Anganwadistaff> anganwadistafflst=anganwadistaffRepository.findAll();
        return new ResponseEntity<>(anganwadistafflst,HttpStatus.OK);
    }

    @GetMapping("/getParticularStaff/{id}")
    public ResponseEntity<?> getStaff(@PathVariable String id)
    {
        Optional<Grampanchayat> Gp=grampanchayatRepository.findById(Integer.parseInt(id));
        if(Gp.isPresent())
        {
            List<Anganwadistaff> anganwadistaffList=anganwadistaffRepository.findByAnganwadiVillageGrampanchayatId(Integer.parseInt(id));
            return new ResponseEntity<>(anganwadistaffList,HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Gram Panchayat not found",HttpStatus.OK);
    }

    @GetMapping("/getStaffDetails/{aid}")
    public ResponseEntity<?> getStaff(@PathVariable Integer aid)
    {
        Optional<Anganwadistaff> As=anganwadistaffRepository.findById(aid);
        if(As.isPresent())
        {
            Anganwadistaff anganwadistaff=As.get();
            return new ResponseEntity<>(anganwadistaff,HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Anganwadi Staff Id Mismatch",HttpStatus.OK);
    }

    @PostMapping("/chkstaff")
    public ResponseEntity<?> chkStaffDetails(@RequestBody Anganwadistaff obj)
    {
        Optional<Anganwadistaff> L=anganwadistaffRepository.findById(obj.getId());
        if(L.isPresent())
        {
            Anganwadistaff anganwadistaff=L.get();
            if(anganwadistaff.getPassword().equals(obj.getPassword()))
            {
                if(anganwadistaff.getStafftype().equals("Teaching"))
                    return new ResponseEntity<>("Teaching Entered Correct Password",HttpStatus.OK);
                else
                    return new ResponseEntity<>("Care Taker Entered Correct Password",HttpStatus.OK);
            }
            else
                return new ResponseEntity<>("Incorrect Password",HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Staff Id Mismatch",HttpStatus.OK);
    }

    @GetMapping("/getTotalamount/{id}")
    public ResponseEntity<?> getAmount(@PathVariable String id)
    {
        Optional<Anganwadistaff> As=anganwadistaffRepository.findById(Integer.parseInt(id));
        if(As.isPresent())
        {
            Anganwadistaff anganwadistaff=As.get();
            return new ResponseEntity<>(anganwadistaff.getAnganwadi().getBalance(),HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Staff Id Mismatch",HttpStatus.OK);
    }

}
