package com.Ruralschool.Repository;

import com.Ruralschool.Entity.NutritionItems;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface NutritionItemsRepository extends JpaRepository<NutritionItems,Integer>
{
    List<NutritionItems> findByNutritionstaffId(Integer id);

    Optional<NutritionItems> findByWomenWomenid(Integer id);

    @Query("select n from NutritionItems n where n.women.womenid=?1")
    List<NutritionItems> findByAllNutrition(Integer id);

    List<NutritionItems> findByWomenWomenanganidAid(Integer id);

}
