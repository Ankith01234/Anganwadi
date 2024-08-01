package com.Ruralschool.Repository;

import com.Ruralschool.Entity.Anganwadi;
import com.Ruralschool.Entity.Anganwadistaff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface AnganwadistaffRepository extends JpaRepository<Anganwadistaff,Integer>
{
    Optional<Anganwadistaff> findByStaffemail(String email);

    List<Anganwadistaff> findByAnganwadiVillageGrampanchayatId(Integer id);

    @Query("select a.aname from Anganwadi a inner join Anganwadistaff as on as.anganwadi.aid=a.aid where as.id=?1")
    String findByAnganwadiname(Integer id);

}
