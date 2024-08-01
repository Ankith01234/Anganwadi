package com.Ruralschool.Repository;

import com.Ruralschool.Entity.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface WalletRepository extends JpaRepository<Wallet,Integer>
{

    List<Wallet> findByAnganVillageGrampanchayatId(Integer id);

    List<Wallet> findByAnganAid(Integer id);

}
