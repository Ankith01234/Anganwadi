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
public class Village
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int vid;

    private String villagename;

    @ManyToOne
    @JoinColumn(name="gpid")
    private Grampanchayat grampanchayat;

    @OneToMany(mappedBy = "village")
    @JsonIgnore
    private List<Anganwadi> anganwadi;

}
