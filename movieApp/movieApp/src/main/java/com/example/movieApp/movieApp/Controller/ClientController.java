package com.example.movieApp.movieApp.Controller;


import ch.qos.logback.core.net.server.Client;
import com.example.movieApp.movieApp.Dto.ClientDTO;
import com.example.movieApp.movieApp.Service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("api/v1/client")


public class ClientController {

    @Autowired
    private ClientService clientService;

    @PostMapping(path = "/save")
    public String saveClient(@RequestBody ClientDTO clientDTO)
    {
        String id = ClientService.addClient(clientDTO);
        return id;
    }



}
