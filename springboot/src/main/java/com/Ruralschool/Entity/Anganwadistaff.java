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
public class Anganwadistaff
{

    @Id
    private int id;

    private String staffname;

    @ManyToOne
    @JoinColumn(name="anganid")
    private Anganwadi anganwadi;

    private String stafftype;
    private String password;
    private String staffphone;
    private String staffemail;
    private String staffaddress;

    @OneToMany(mappedBy = "anganwadistaff")
    @JsonIgnore
    private List<Staffchildren> staffchildrens;

    @OneToMany(mappedBy = "nutritionstaff")
    @JsonIgnore
    private List<NutritionItems> nutritionItems;

    @OneToMany(mappedBy = "vaccinestaff")
    @JsonIgnore
    private List<VaccineDetails> vaccineDetails;

}
