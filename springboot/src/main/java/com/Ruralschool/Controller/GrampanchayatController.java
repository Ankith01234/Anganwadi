package com.Ruralschool.Controller;

import com.Ruralschool.DTO.EmailData;
import com.Ruralschool.Entity.Grampanchayat;
import com.Ruralschool.Entity.Taluk;
import com.Ruralschool.Repository.GrampanchayatRepository;
import com.Ruralschool.Repository.TalukRepository;
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
public class GrampanchayatController
{
    @Autowired
    GrampanchayatRepository grampanchayatRepository;

    @Autowired
    TalukRepository talukRepository;

    @Autowired
    Smtpserviceclass smtpserviceclass;

    @PostMapping("/addGramPanchayat/{talukid}")
    public ResponseEntity<?> addGramPan(@RequestBody Grampanchayat obj,@PathVariable Integer talukid)
    {
        Optional<Grampanchayat> Gp=grampanchayatRepository.findByGpname(obj.getGpname());
        if(Gp.isPresent())
            return new ResponseEntity<>("Gram Panchayat name Already Exists", HttpStatus.OK);
        else
        {
            Optional<Taluk> T=talukRepository.findById(talukid);
            if(T.isPresent())
            {
                Taluk taluk=T.get();
                obj.setTaluk(taluk);
                Random rnd=new Random();
                int id=rnd.nextInt(100000,999999);
                int password=rnd.nextInt(1000,9999);
                obj.setId(id);
                obj.setPassword(String.valueOf(password));
                grampanchayatRepository.save(obj);

                EmailData emailData=new EmailData();
                emailData.setRecepient(obj.getGmail());
                emailData.setSubject("Login Credentials");
                String Txt="Your Id: "+id+" ,Password: "+password;
                emailData.setMessage(Txt);

                String msg=smtpserviceclass.sendMail(emailData);

                if(msg.equals("Mail Sent Successfully"))
                    return new ResponseEntity<>("Gram Panchayat added Successfully",HttpStatus.OK);
                else
                    return new ResponseEntity<>(msg,HttpStatus.OK);

            }
            else
                return new ResponseEntity<>("Taluk id Mismatch",HttpStatus.OK);
        }
    }

    @GetMapping("/getAllGramPanchayat")
    public ResponseEntity<?> getGpVal()
    {
        List<Grampanchayat> Gplst=grampanchayatRepository.findAll();
        return new ResponseEntity<>(Gplst,HttpStatus.OK);
    }

    @PostMapping("/chkGp")
    public ResponseEntity<?> chkLogin(@RequestBody Grampanchayat obj)
    {
        Optional<Grampanchayat> Gp = grampanchayatRepository.findById(obj.getId());
        if (Gp.isPresent())
        {
            Grampanchayat grampanchayat = Gp.get();
            if (grampanchayat.getPassword().equals(obj.getPassword()))
                return new ResponseEntity<>("Correct Password", HttpStatus.OK);
            else
                return new ResponseEntity<>("Either Id or Password Mismatch", HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("You Don't have Account",HttpStatus.OK);
    }

}
