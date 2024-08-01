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
public class VaccineDetails
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int vid;

    @ManyToOne
    @JoinColumn(name="babyid")
    private Baby baby;

    @ManyToOne
    @JoinColumn(name="staffid")
    private Anganwadistaff vaccinestaff;

    private String vaccinename;
    private String date;
    private String status;

}
