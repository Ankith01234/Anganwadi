package com.Ruralschool.Controller;

import com.Ruralschool.Entity.Anganwadi;
import com.Ruralschool.Entity.Anganwadistaff;
import com.Ruralschool.Entity.Grampanchayat;
import com.Ruralschool.Entity.Wallet;
import com.Ruralschool.Repository.AnganwadiRepository;
import com.Ruralschool.Repository.AnganwadistaffRepository;
import com.Ruralschool.Repository.GrampanchayatRepository;
import com.Ruralschool.Repository.WalletRepository;
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
public class WalletController
{
    @Autowired
    WalletRepository walletRepository;

    @Autowired
    AnganwadiRepository anganwadiRepository;

    @Autowired
    GrampanchayatRepository grampanchayatRepository;

    @Autowired
    AnganwadistaffRepository anganwadistaffRepository;

    @PostMapping("/addAmount/{aid}")
    public ResponseEntity<?> addAmountToAngan(@RequestBody Wallet obj, @PathVariable Integer aid)
    {
        Optional<Anganwadi> A=anganwadiRepository.findById(aid);
        if(A.isPresent())
        {
            Anganwadi anganwadi=A.get();
            obj.setAngan(anganwadi);
            Date d=new Date();
            SimpleDateFormat dateFormat=new SimpleDateFormat("yyyy-MM-dd");
            String date=dateFormat.format(d);
            obj.setDate(date);
            walletRepository.save(obj);
            return new ResponseEntity<>("Amount added Successfully", HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Angaanwadi not found",HttpStatus.OK);
    }

    @GetMapping("/getAmountDetails")
    public ResponseEntity<?> getDetails()
    {
        List<Wallet> walletList=walletRepository.findAll();
        return new ResponseEntity<>(walletList,HttpStatus.OK);
    }

    @GetMapping("/getParticularAmountDetails/{id}")
    public ResponseEntity<?> getAmountDetails(@PathVariable String id)
    {
        Optional<Grampanchayat> Gp=grampanchayatRepository.findById(Integer.parseInt(id));
        if(Gp.isPresent())
        {
            List<Wallet> amountlst=walletRepository.findByAnganVillageGrampanchayatId(Integer.parseInt(id));
            return new ResponseEntity<>(amountlst,HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Gram Panchayat is Mismatch",HttpStatus.OK);
    }

    @GetMapping("/getAmountDetailsFromGram/{id}")
    public ResponseEntity<?> getDetails(@PathVariable String id)
    {
        Optional<Anganwadistaff> As=anganwadistaffRepository.findById(Integer.parseInt(id));
        if(As.isPresent())
        {
            Anganwadistaff anganwadistaff=As.get();
            List<Wallet> lists=walletRepository.findByAnganAid(anganwadistaff.getAnganwadi().getAid());
            return new ResponseEntity<>(lists,HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Staff Id Mismatch",HttpStatus.OK);
    }

}
