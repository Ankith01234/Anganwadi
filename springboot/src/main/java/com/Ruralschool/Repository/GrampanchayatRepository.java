package com.Ruralschool.Repository;

import com.Ruralschool.Entity.Grampanchayat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GrampanchayatRepository extends JpaRepository<Grampanchayat,Integer>
{
    Optional<Grampanchayat> findByGpname(String gpname);

    Optional<Grampanchayat> findByGmail(String gmail);

}
