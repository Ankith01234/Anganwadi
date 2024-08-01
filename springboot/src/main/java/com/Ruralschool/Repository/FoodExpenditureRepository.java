package com.Ruralschool.Repository;

import com.Ruralschool.Entity.FoodExpenditure;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FoodExpenditureRepository extends JpaRepository<FoodExpenditure,Integer>
{
    List<FoodExpenditure> findByAnganwadiobjAid(Integer id);

}
