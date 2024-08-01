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
public class Feedback
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name="anganid")
    private Anganwadi feedBackAngan;

    @ManyToOne
    @JoinColumn(name="womenid")
    private Women feedBackWomen;

    private String date;
    private String status;
    private String feedback;

}
