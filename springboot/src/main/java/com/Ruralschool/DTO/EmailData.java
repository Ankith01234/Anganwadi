package com.Ruralschool.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EmailData
{
    private String recepient;
    private String subject;
    private String message;
    private int otp;
}
