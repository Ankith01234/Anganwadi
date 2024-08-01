package com.Ruralschool.Repository;

import com.Ruralschool.Entity.VaccineDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface VaccineDetailsRepository extends JpaRepository<VaccineDetails,Integer>
{
    List<VaccineDetails> findByBabyBabyid(Integer id);

    @Query("select v from VaccineDetails v inner join Baby b on b.babyid=v.baby.babyid where b.babywomen.womenid=?1")
    List<VaccineDetails> findByBabyBabywomen(Integer id);

    List<VaccineDetails> findByVaccinestaffAnganwadiAid(Integer id);

}
