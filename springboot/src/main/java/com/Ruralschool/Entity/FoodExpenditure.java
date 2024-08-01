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
public class FoodExpenditure
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int foodid;

    private String foodname;
    private int amount;

    @ManyToOne
    @JoinColumn(name = "Anganid")
    private Anganwadi anganwadiobj;

    private String date;

}
