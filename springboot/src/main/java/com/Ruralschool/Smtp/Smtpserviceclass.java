package com.Ruralschool.Smtp;

import com.Ruralschool.DTO.EmailData;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

@Service
public class Smtpserviceclass
{
    @Value("${spring.mail.username}") private String sender;

    static int token;

    @Autowired
    JavaMailSender javaMailSender;

    public String sendMail(@RequestBody EmailData details)
    {
        MimeMessage mimeMessage=javaMailSender.createMimeMessage();

        MimeMessageHelper mimeMessageHelper;

        try {
            mimeMessageHelper=new MimeMessageHelper(mimeMessage,true);
            mimeMessageHelper.setFrom(sender);
            mimeMessageHelper.setTo(details.getRecepient());
            mimeMessageHelper.setText(details.getMessage());
            mimeMessageHelper.setSubject(details.getSubject());

            javaMailSender.send(mimeMessage);
            return "Mail Sent Successfully";

        }
        catch (MessagingException e4)
        {
            return "Mail can't sent something went wrong !!!";
        }

    }

    public String sendOtpMail(@RequestBody EmailData details)
    {
        MimeMessage mimeMessage=javaMailSender.createMimeMessage();

        MimeMessageHelper mimeMessageHelper;

        try {
            mimeMessageHelper=new MimeMessageHelper(mimeMessage,true);
            mimeMessageHelper.setFrom(sender);
            mimeMessageHelper.setTo(details.getRecepient());
            mimeMessageHelper.setText(details.getMessage());
            mimeMessageHelper.setSubject(details.getSubject());
            token=details.getOtp();

            javaMailSender.send(mimeMessage);
            return "Mail Sent Successfully";

        }
        catch (MessagingException e4)
        {
            return "Mail can't sent something went wrong !!!";
        }

    }

    public String chkOtp(@RequestBody EmailData details)
    {
        if(details.getOtp()==token)
            return "Correct Otp";
        else
            return "Wrong Otp";
    }

}
