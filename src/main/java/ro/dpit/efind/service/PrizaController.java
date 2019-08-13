package ro.dpit.efind.service;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.sql.*;
import java.util.*;


@RestController
public class PrizaController  {


    ConnectionPool connectionPool;
    {
        try {
            Class.forName("org.postgresql.Driver");
            connectionPool = BasicConnectionPool
                    .create("jdbc:postgresql://localhost:5432/efind", "postgres", "the0chosen0one");
            Runtime.getRuntime().addShutdownHook(new Thread() {
                public final void run() {
                    try {
                        connectionPool.shutdown();
                        System.out.println("Merge shutdown hook");
                    } catch (SQLException e) {
                        System.out.println("NU merge shutdown");
                        e.printStackTrace();
                    }
                }
            });
        } catch (SQLException| ClassNotFoundException e) {
            e.printStackTrace();
        }
    }

    DBinterface DB = BasicDB.create();

    @RequestMapping("/getPriza")
    public Priza getDetails(@RequestParam(value="id") int id) {

        return DB.aduPriza(id);

    }

    @RequestMapping("/getPointeri")
    public List<MapPoint> getPrize(@RequestParam(value="lats") double lats,
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
                         @RequestParam(value = "lng") double Longitude){
        DB.bagaPriza(Nume, tip, Descriere, Latitude, Longitude);
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

        try{
            Connection conn = connectionPool.getConnection();
            Statement stmt = null;
            conn.setAutoCommit(false);
            stmt = conn.createStatement();
            stmt.executeUpdate("UPDATE \"priza\".\"detalii\" set status = 2 WHERE id="+id+";");
            stmt.executeUpdate("UPDATE \"priza\".\"detalii\" set status = "+status+"WHERE id="+id+";");
            stmt.close();
            conn.commit();
            connectionPool.releaseConnection(conn);
        }catch(Exception e) {
            System.out.println("*=======*");
            e.printStackTrace();
        }

        DB.schimbaStatus(id, status);

    }
    @RequestMapping("/report")
    public void report (@RequestParam(value = "id") int id)
    {
        DB.raporteaza(id);
    }
}

