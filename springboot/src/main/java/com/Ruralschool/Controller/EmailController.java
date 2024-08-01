package com.Ruralschool.Controller;

import com.Ruralschool.DTO.EmailData;
import com.Ruralschool.Entity.Anganwadistaff;
import com.Ruralschool.Entity.Grampanchayat;
import com.Ruralschool.Repository.AnganwadistaffRepository;
import com.Ruralschool.Repository.GrampanchayatRepository;
import com.Ruralschool.Smtp.Smtpserviceclass;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Random;

@RestController
@CrossOrigin("*")
public class EmailController
{
    @Autowired
    Smtpserviceclass smtpserviceclass;

    @Autowired
    AnganwadistaffRepository anganwadistaffRepository;

    @Autowired
    GrampanchayatRepository grampanchayatRepository;

    @PostMapping("/sendOtp/{emailid}")
    public ResponseEntity<?> sndOtp(@PathVariable String emailid)
    {
        Optional<Anganwadistaff> As=anganwadistaffRepository.findByStaffemail(emailid);
        Optional<Grampanchayat> Gp=grampanchayatRepository.findByGmail(emailid);
        if(As.isPresent() || Gp.isPresent())
        {
            Random rnd=new Random();
            int otp=rnd.nextInt(1000,9999);
            EmailData emailData=new EmailData();
            emailData.setOtp(otp);
            emailData.setRecepient(emailid);
            emailData.setSubject("Otp Verification");
            emailData.setMessage("Your otp is: "+otp);
            String message=smtpserviceclass.sendOtpMail(emailData);
            if(message.equals("Mail Sent Successfully"))
                return new ResponseEntity<>("Otp Sent to your E-mail Please Check",HttpStatus.OK);
            else
                return new ResponseEntity<>(message,HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Email Doesn't Exists", HttpStatus.OK);
    }

    @GetMapping("/chkOtp/{otp}")
    public ResponseEntity<?> chkOtpValue(@PathVariable Integer otp)
    {
        EmailData emailData=new EmailData();
        emailData.setOtp(otp);
        String msg=smtpserviceclass.chkOtp(emailData);
        if(msg.equals("Correct Otp"))
            return new ResponseEntity<>("Entered Correct Otp",HttpStatus.OK);
        else
            return new ResponseEntity<>("Wrong Otp",HttpStatus.OK);
    }

    @PutMapping("/changePassword/{email}/{newpass}")
    public ResponseEntity<?> changePasswordVal(@PathVariable String email,@PathVariable String newpass)
    {
        Optional<Anganwadistaff> As=anganwadistaffRepository.findByStaffemail(email);
        Optional<Grampanchayat> Gp=grampanchayatRepository.findByGmail(email);
        if(As.isPresent())
        {
            Anganwadistaff anganwadistaff=As.get();
            anganwadistaff.setPassword(newpass);
            anganwadistaffRepository.save(anganwadistaff);
            return new ResponseEntity<>("Password Changed Suucessfully",HttpStatus.OK);
        }
        else if(Gp.isPresent())
        {
            Grampanchayat grampanchayat=Gp.get();
            grampanchayat.setPassword(newpass);
            grampanchayatRepository.save(grampanchayat);
            return new ResponseEntity<>("Password Changed Suucessfully",HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Email not found",HttpStatus.OK);
    }

}
