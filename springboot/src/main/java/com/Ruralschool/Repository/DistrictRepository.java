package com.Ruralschool.Repository;


import com.Ruralschool.Entity.District;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DistrictRepository extends JpaRepository<District,Integer>
{
    Optional<District> findByDistrictname(String districtname);
}
