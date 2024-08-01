package com.Ruralschool.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Anganwadi
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int aid;

    private String aname;

    @ManyToOne
    @JoinColumn(name = "villageid")
    private Village village;

    private String phone;
    private String address;
    private int balance;

    @OneToMany(mappedBy = "anganwadi")
    @JsonIgnore
    private List<Anganwadistaff> anganwadistaff;

    @OneToMany(mappedBy = "angan")
    @JsonIgnore
    private List<Wallet>wallet;

    @OneToMany(mappedBy = "anganwadiobj")
    @JsonIgnore
    private List<FoodExpenditure> foodExpenditure;

    @OneToMany(mappedBy = "womenanganid")
    @JsonIgnore
    private List<Women> women;

    @OneToMany(mappedBy = "feedBackAngan")
    @JsonIgnore
    private List<Feedback> feedback;

    @OneToMany(mappedBy = "compainAngan")
    @JsonIgnore
    private List<Complaint> complaints;

}
