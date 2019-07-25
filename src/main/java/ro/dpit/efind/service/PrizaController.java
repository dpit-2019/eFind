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
    @RequestMapping("/getPriza")
    public Priza getDetails(@RequestParam(value="id") Long id) {
        Priza res = new Priza();
        try {
            Statement stmt = null;
            Connection conn = connectionPool.getConnection();
            conn.setAutoCommit(false);
            stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM \"priza\".\"detalii\" WHERE id=" + id + ";");
            while(rs.next()) {
                res.setId(id);
                res.setName(rs.getString("nume"));
                res.setTip(rs.getInt("tip"));
                res.setDescriere(rs.getString("descriere"));
                res.setLat(rs.getDouble("lat"));
                res.setLng(rs.getDouble("lng"));
                res.setPending(rs.getInt("status"));
                res.setReports(rs.getInt("reports"));
            }
            System.out.println("servicul e accesat");
            rs.close();
            connectionPool.releaseConnection(conn);
            stmt.close();
        } catch (Exception e) {
            System.out.println("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
            e.printStackTrace();

        }
        return res;
    }



    @RequestMapping("/getPointeri")
    public List<MapPoint> getPrize(@RequestParam(value="lats") double lats,
                                   @RequestParam(value="lngs") double lngs,
                                   @RequestParam(value="latj") double latj,
                                   @RequestParam(value="lngj") double lngj ){
        List<MapPoint> rez = new ArrayList<MapPoint>();
        try{
            Connection conn = connectionPool.getConnection();
            Statement stmt = null;
            conn.setAutoCommit(false);
            stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT lat, lng, id FROM \"priza\".\"detalii\" WHERE lat<"+lats+"AND lat>" +latj+
                    "AND lng<"+lngs+"AND lng>"+lngj+"AND status=2;");
            int t=0;
            while(rs.next())
            {
                MapPoint to = new MapPoint();
                to.setId(rs.getInt("id"));
                to.setLng(rs.getDouble("lng"));
                to.setLat(rs.getDouble("lat"));
                rez.add(to);
                t++;
            }
            System.out.println("merge getPointeri");
            connectionPool.releaseConnection(conn);
        }catch(Exception e) {
            System.out.println("nu merge==========================================getPointeri");
            e.printStackTrace();
        }
        return rez;
    }



    @RequestMapping("/addPriza")
    public void addPriza(@RequestParam(value = "nume") String Nume,
                         @RequestParam(value = "tip") int tip,
                         @RequestParam(value = "descriere") String Descriere,
                         @RequestParam(value = "lat") double Latitude,
                         @RequestParam(value = "lng") double Longitude){

        try{
            Connection conn = connectionPool.getConnection();
            Statement stmt = null;
            conn.setAutoCommit(false);
            stmt = conn.createStatement();
            stmt.executeUpdate("INSERT INTO \"priza\".\"detalii\"(nume,tip, descriere, lat, lng ) VALUES ("+Nume+","+ tip+","+ Descriere+","+Latitude+","+Longitude+");");
            stmt.close();
            conn.commit();
            connectionPool.releaseConnection(conn);
        }catch(Exception e) {
            System.out.println("nu merge====================Adaugarea");
            e.printStackTrace();
        }
    }
    @RequestMapping("/update")
    public void updatePriza (@RequestParam(value = "nume") String Nume,
                             @RequestParam(value = "tip") int tip,
                             @RequestParam(value = "descriere") String Descriere,
                             @RequestParam(value  = "id") int id){

        try{
            Connection conn = connectionPool.getConnection();
            Statement stmt = null;
            conn.setAutoCommit(false);
            stmt = conn.createStatement();
            stmt.executeUpdate("UPDATE \"priza\".\"detalii\" SET nume = "+Nume+", tip = "+tip+", descriere= "+Descriere+"WHERE id="+id+";");
            stmt.close();
            conn.commit();
            connectionPool.releaseConnection(conn);
        }catch(Exception e) {
            System.out.println("nu merge===================UPdate");
            e.printStackTrace();
        }
    }




    @RequestMapping("/getBackOfficeData")
    public List<Priza> getBackOfficeData()
    {
        List<Priza> rez = new ArrayList<Priza>();
        try{
            Connection conn = connectionPool.getConnection();
            Statement stmt = null;

            conn.setAutoCommit(false);
            System.out.println("Opened database successfully");
            stmt = conn.createStatement();
            ResultSet rs= stmt.executeQuery("select * FROM \"priza\".\"detalii\";");
            while(rs.next()) {
                Priza to = new Priza();
                to.setId(rs.getInt("id"));
                to.setName(rs.getString("nume"));
                to.setTip(rs.getInt("tip"));
                to.setDescriere(rs.getString("descriere"));
                to.setLat(rs.getDouble("lat"));
                to.setLng(rs.getDouble("lng"));
                to.setPending(rs.getInt("status"));
                to.setReports(rs.getInt("reports"));
                rez.add(to);
            }
            stmt.close();
            connectionPool.releaseConnection(conn);
        }catch(Exception e) {
            System.out.println("=================BackOffice=============");
            e.printStackTrace();
        }
        return rez;

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
    }
    @RequestMapping("/report")
    public void report (@RequestParam(value = "id") int id)
    {
        try {
            Connection conn = connectionPool.getConnection();
            Connection conn2= connectionPool.getConnection();
            Statement stmt = null;
            Statement stmt2 = null;
            conn.setAutoCommit(false);
            conn2.setAutoCommit(false);
            stmt2 = conn2.createStatement();
            stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT reports FROM \"priza\".\"detalii\" WHERE id = "+id+";");
            int tot=1;
            while(rs.next())
                tot=rs.getInt("reports");
            stmt.executeUpdate("UPDATE \"priza\".\"detalii\" set reports = "+(tot+1)+" WHERE id="+id+";");
            conn.commit();
            connectionPool.releaseConnection(conn);
            connectionPool.releaseConnection(conn2);
        }catch (Exception e){
            e.printStackTrace();
        }
    }

}

