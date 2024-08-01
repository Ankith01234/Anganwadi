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
public class Women
{
    @Id
    private int womenid;

    private String password;
    private String womenname;
    private int age;
    private String address;
    private String phone;

    @ManyToOne
    @JoinColumn(name = "anganwadiiId")
    private Anganwadi womenanganid;

    @OneToMany(mappedBy = "women")
    @JsonIgnore
    private List<NutritionItems> nutritionItems;

    @OneToMany(mappedBy = "babywomen")
    @JsonIgnore
    private List<Baby> babies;

    @OneToMany(mappedBy = "feedBackWomen")
    @JsonIgnore
    private List<Feedback> feedback;

    @OneToMany(mappedBy = "complainwomen")
    @JsonIgnore
    private List<Complaint> complaints;

}
