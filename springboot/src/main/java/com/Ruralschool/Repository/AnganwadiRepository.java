package com.Ruralschool.Repository;

import com.Ruralschool.Entity.Anganwadi;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AnganwadiRepository extends JpaRepository<Anganwadi,Integer>
{
    Optional<Anganwadi> findByAname(String name);

    List<Anganwadi> findByVillageGrampanchayatId(Integer id);
}
