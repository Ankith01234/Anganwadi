package com.Ruralschool.Repository;

import com.Ruralschool.Entity.Women;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WomenRepository extends JpaRepository<Women,Integer>
{
    List<Women> findByWomenanganidAid(Integer id);
}
