package com.example.movieApp.movieApp.Dto;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

public class ClientDTO {

    private int clientid;
    private String clientname;
    private String email;
    private String password;

    public ClientDTO(int clientid, String password, String email, String clientname) {
        this.clientid = clientid;
        this.password = password;
        this.email = email;
        this.clientname = clientname;
    }

    public ClientDTO() {
    }

    public int getClientid() {
        return clientid;
    }

    public void setClientid(int clientid) {
        this.clientid = clientid;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getClientname() {
        return clientname;
    }

    public void setClientname(String clientname) {
        this.clientname = clientname;
    }

    @Override
    public String toString() {
        return "ClientDTO{" +
                "clientid=" + clientid +
                ", clientname='" + clientname + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
