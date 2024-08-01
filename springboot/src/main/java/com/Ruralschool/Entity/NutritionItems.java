package com.Ruralschool.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class NutritionItems
{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name="womenid")
    private Women women;

    @ManyToOne
    @JoinColumn(name="staffid")
    private Anganwadistaff nutritionstaff;

    private String nutritionName;
    private String date;
    private String status;

}
