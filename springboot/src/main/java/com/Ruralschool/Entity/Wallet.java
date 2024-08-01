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
public class Wallet
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int walletid;

    @ManyToOne
    @JoinColumn(name="anganid")
    private Anganwadi angan;

    private String date;
    private int amount;

}
