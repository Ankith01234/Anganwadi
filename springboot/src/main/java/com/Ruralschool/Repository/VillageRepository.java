package com.Ruralschool.Repository;

import com.Ruralschool.Entity.Village;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface VillageRepository extends JpaRepository<Village,Integer>
{
    Optional<Village> findByVillagename(String vname);

    @Query("select v from Village v where grampanchayat.id=?1")
    List<Village> findByvillage(Integer id);
}
