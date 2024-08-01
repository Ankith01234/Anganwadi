package com.Ruralschool.Repository;

import com.Ruralschool.Entity.Taluk;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TalukRepository extends JpaRepository<Taluk,Integer>
{
    Optional<Taluk> findByTalukname(String talukname);
}
