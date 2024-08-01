package com.Ruralschool.Repository;

import com.Ruralschool.Entity.Baby;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface BabyRepository extends JpaRepository<Baby,Integer>
{
    List<Baby> findByBabywomenWomenid(Integer id);

//    @Query("select b from Baby b where b.babywomen.womenid=?1")
//    Optional<Baby> findByBabyWomenid(Integer id);

//    @Query("select b from Baby b where b.babywomen.womenid=?1")
//    Optional<Baby> findBywomen(Integer id);
}
