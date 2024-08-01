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
public class Baby
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int babyid;

    @ManyToOne
    @JoinColumn(name="womenid")
    private Women babywomen;

    private String gender;
    private String months;

    @OneToMany(mappedBy = "baby")
    @JsonIgnore
    private List<VaccineDetails> vaccineDetails;

}
