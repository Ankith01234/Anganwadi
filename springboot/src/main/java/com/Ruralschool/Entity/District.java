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
public class District
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int districtid;

    private String districtname;

    @OneToMany(mappedBy = "district")
    @JsonIgnore
    private List<Taluk> talukList;
}
