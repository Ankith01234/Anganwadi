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
public class Taluk
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int talukid;

    private String talukname;

    @ManyToOne
    @JoinColumn(name="districtid")
    private District district;

    @OneToMany(mappedBy = "taluk")
    @JsonIgnore
    private List<Grampanchayat> grampanchayats;

}
