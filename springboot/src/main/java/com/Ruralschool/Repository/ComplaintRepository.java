package com.Ruralschool.Repository;

import com.Ruralschool.Entity.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ComplaintRepository extends JpaRepository<Complaint,Integer>
{
//    List<Complaint> findByComplainwomenWomenanganidVillageGrampanchayatIdAndStatus(Integer id,String status);

    List<Complaint> findByCompainAnganAidAndStatus(Integer id,String status);
}
