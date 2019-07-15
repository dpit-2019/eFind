package ro.dpit.efind.service;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.sql.*;


@RestController
public class PrizaController {

    @RequestMapping("/getPriza")
    public Priza getDetails(@RequestParam(value="id") Long id) {
        Priza res = new Priza();
        Connection c = null;
        Statement stmt = null;
        try {
            Class.forName("org.postgresql.Driver");
            c = DriverManager
                    .getConnection("jdbc:postgresql://localhost:5432/EfindTestDB",
                            "postgres", "password");
            c.setAutoCommit(false);
            System.out.println("Opened database successfully");
            stmt = c.createStatement();
            ResultSet rs = ((java.sql.Statement) stmt).executeQuery("SELECT * FROM \"prizaEfind\".\"detalii\" WHERE id=" + id + ";");

            while(rs.next()) {
                res.setId(id);
                res.setName(rs.getString("nume"));
                res.setTip(rs.getInt("tip"));
                res.setDescriere(rs.getString("descriere"));
                res.setLat(rs.getFloat("lat"));
                res.setLng(rs.getFloat("lng"));
                rs.close();
                stmt.close();
                c.close();
                return res;
            }
        } catch (Exception e) {
            System.out.println("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
            e.printStackTrace();
            System.err.println(e.getClass().getName() + ": " + e.getMessage());
        }
        System.out.println("Operation done successfully");
        return res;
    }
    @RequestMapping("/getPointeri")
    public Pointers getPrize(@RequestParam(value="lats") double lats,
                             @RequestParam(value="lngs") double lngs,
                             @RequestParam(value="latj") double latj,
                             @RequestParam(value="lngj") double lngj ){
        Pointers rez = new Pointers();
        double[] lat= new double[350];
        double[] lng= new double[350];
        Connection c = null;
        Statement stmt = null;
        try{
            Class.forName("org.postgresql.Driver");
            c = DriverManager
                    .getConnection("jdbc:postgresql://localhost:5432/EfindTestDB",
                            "postgres", "password");
            c.setAutoCommit(false);
            System.out.println("Opened database successfully");
            stmt = c.createStatement();
            ResultSet rs = ((java.sql.Statement) stmt).executeQuery("SELECT lat, lng FROM \"prizaEfind\".\"detalii\" WHERE lat<"+lats+"AND lat>" +latj+
                    "AND lng<"+lngs+"AND lng>"+lngj+";");
            int t=0;
            while(rs.next())
            {
                lat[t]=rs.getDouble("lat");
                lng[t]=rs.getDouble("lng");
                t++;
            }
            rez.setLatitude(lat);
            rez.setLongitude(lng);
        }catch(Exception e) {
            System.out.println("nu merge============================================");
        }
        return rez;
    }
    @RequestMapping("/addPriza")
    public void addPriza(@RequestParam(value = "nume") String Nume,
                        @RequestParam(value = "tip") int tip,
                        @RequestParam(value = "descriere") String Descriere,
                        @RequestParam(value = "lat") double Latitude,
                        @RequestParam(value = "lng") double Longitude){

        Connection c = null;
        Statement stmt = null;
        try{
            Class.forName("org.postgresql.Driver");
            c = DriverManager
                    .getConnection("jdbc:postgresql://localhost:5432/EfindTestDB",
                            "postgres", "password");
            c.setAutoCommit(false);
            System.out.println("Opened database successfully");
            stmt = c.createStatement();
             stmt.executeUpdate("INSERT INTO \"prizaEfind\".\"detalii\" VALUES (7,"+Nume+","+ tip+","+ Descriere+","+Latitude+","+Longitude+");");
            stmt.close();
            c.commit();
            c.close();
        }catch(Exception e) {
            System.out.println("nu merge====================Adaugarea");
            e.printStackTrace();
        }
    }
    @RequestMapping("/getBackOfficeData")
    public Prize getBackOfficeData()
    {
        int [] pending = new int[150];
         int[] id = new int[150] ;
         String[] Nume = new String[150] ;
         int[] tip = new int[150]  ;
         String[] Descriere =new String[150];
         double[] lat = new double[150];
         double[] lng = new double[150];
        Prize rezulltat =  new Prize();
        Connection c = null;
        Statement stmt = null;
        try{
            Class.forName("org.postgresql.Driver");
            c = DriverManager
                    .getConnection("jdbc:postgresql://localhost:5432/EfindTestDB",
                            "postgres", "password");
            c.setAutoCommit(false);
            System.out.println("Opened database successfully");
            stmt = c.createStatement();
            ResultSet rs= stmt.executeQuery("select * FROM \"prizaEfind\".\"detalii\"");
            int i=1;
            while(rs.next()) {
                id[i] = rs.getInt("id");
                Nume[i] = rs.getString("nume");
                tip[i] = rs.getInt("tip");
                Descriere[i] = rs.getString("descriere");
                lat[i] = rs.getDouble("lat");
                lng[i] = rs.getDouble("lng");
                pending[i]=rs.getInt("pending");
                i++;
            }
            stmt.close();
            c.close();
            rezulltat.setId(id);
            rezulltat.setNume(Nume);
            rezulltat.setTip(tip);
            rezulltat.setDescriere(Descriere);
            rezulltat.setLat(lat);
            rezulltat.setLng(lng);
            rezulltat.setPending(pending);
        }catch(Exception e) {
            System.out.println("=================BackOffice=============");
            e.printStackTrace();
        }
        return rezulltat;

    }
    @RequestMapping("/changeStatus")
    public void changeStatus (@RequestParam(value = "id") int id)
    {
        Connection c = null;
        Statement stmt = null;
        try{
            Class.forName("org.postgresql.Driver");
            c = DriverManager
                    .getConnection("jdbc:postgresql://localhost:5432/EfindTestDB",
                            "postgres", "password");
            c.setAutoCommit(false);
            System.out.println("Opened database successfully");
            stmt = c.createStatement();
            stmt.executeUpdate("UPDATE \"prizaEfind\".\"detalii\" set pending = 0 WHERE id="+id+";");
            stmt.close();
            c.commit();
            c.close();
        }catch(Exception e) {
            System.out.println("*=======*");
            e.printStackTrace();
        }
    }


}

