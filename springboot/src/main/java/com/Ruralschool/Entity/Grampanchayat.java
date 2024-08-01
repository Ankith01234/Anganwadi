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
public class Grampanchayat
{

    @Id
    private int id;

    private String gpname;
    private String gmail;
    private String password;
    private String phno;
    private String address;

    @ManyToOne
    @JoinColumn(name="talukid")
    private Taluk taluk;

    @OneToMany(mappedBy = "grampanchayat")
    @JsonIgnore
    private List<Village> villages;

}
