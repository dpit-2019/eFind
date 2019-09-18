package ro.dpit.efind.service;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.sql.*;
import java.util.*;


@RestController
public class PrizaController  {

    DBinterface DB = BasicDB.create();
    @RequestMapping("/getPriza")
    public Priza getDetails(@RequestParam(value="id") int id) {

        return DB.aduPriza(id);

    }

    @RequestMapping("/getPointeri")
    public List<Priza> getPrize(@RequestParam(value="lats") double lats,
                                   @RequestParam(value="lngs") double lngs,
                                   @RequestParam(value="latj") double latj,
                                   @RequestParam(value="lngj") double lngj ){
       return DB.aduPointeri(latj, lngj, lats, lngs);
    }



    @RequestMapping("/addPriza")
    public void addPriza(@RequestParam(value = "nume") String Nume,
                         @RequestParam(value = "tip") int tip,
                         @RequestParam(value = "descriere") String Descriere,
                         @RequestParam(value = "lat") double Latitude,
                         @RequestParam(value = "lng") double Longitude,
                         @RequestParam(value="total")int total){
        DB.bagaPriza(Nume, tip, Descriere, Latitude, Longitude, total);
    }
    @RequestMapping("/update")
    public void updatePriza (@RequestParam(value = "nume") String Nume,
                             @RequestParam(value = "tip") int tip,
                             @RequestParam(value = "descriere") String Descriere,
                             @RequestParam(value  = "id") int id){
        DB.updatePriza(Nume, tip, Descriere, id);

    }
    @RequestMapping("/getBackOfficeData")
    public List<Priza> getBackOfficeData()
    {
        return DB.aduBackOfficeData();
    }
    @RequestMapping("/changeStatus")
    public void changeStatus (@RequestParam(value = "id") int id,
                              @RequestParam(value = "status") int status)
    {
        DB.schimbaStatus(id, status);
    }
    @RequestMapping("/report")
    public void report (@RequestParam(value = "id") int id)
    {
        DB.raporteaza(id);
    }

    @RequestMapping("/fav")
    public void fav (@RequestParam(value = "id") int id)
    {
        DB.fav(id);
    }
    @RequestMapping("/ocupa")
    public void ocupa (@RequestParam(value = "id") int id)
    {
        DB.ocupa(id);
    }
}

