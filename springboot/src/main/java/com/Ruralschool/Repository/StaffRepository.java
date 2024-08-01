package com.Ruralschool.Repository;

import com.Ruralschool.Entity.Anganwadi;
import com.Ruralschool.Entity.Staffchildren;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StaffRepository extends JpaRepository<Staffchildren,Integer>
{
    Staffchildren findByAnganwadistaffId(Integer id);
}
