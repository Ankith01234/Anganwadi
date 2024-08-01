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
public class Staffchildren
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int slno;

    @ManyToOne
    @JoinColumn(name="staffid")
    private Anganwadistaff anganwadistaff;

    private int malecount;
    private int femalecount;

}
