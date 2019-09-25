package ro.dpit.efind.service;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class BasicDB implements DBinterface {

    ConnectionPool connectionPool;
    {
        try {
            Class.forName("org.postgresql.Driver");
            connectionPool = BasicConnectionPool
                    .create("jdbc:postgresql://localhost:5432/efind", "postgres", "password");
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

    public static BasicDB create(){

        BasicDB rez = new BasicDB();

        return rez;
    }
    public Priza aduPriza(int id)
    {
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

    public List<Priza> aduPointeri(double latj, double lngj, double lats, double lngs){
        List<Priza> rez = new ArrayList<Priza>();
        try{
            Connection conn = connectionPool.getConnection();
            Statement stmt = null;
            conn.setAutoCommit(false);
            stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM \"priza\".\"detalii\" WHERE lat<"+lats+"AND lat>" +latj+

                    "AND lng<"+lngs+"AND lng>"+lngj+"AND status=2;");
            int t=0;
            while(rs.next())
            {
                Priza to = new Priza();
                to.setId(rs.getInt("id"));
                to.setLng(rs.getDouble("lng"));
                to.setLat(rs.getDouble("lat"));
                to.setTip(rs.getInt("tip"));
                to.setName(rs.getString("nume"));
                to.setDescriere(rs.getString("descriere"));
                to.setReports(rs.getInt("reports"));
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

    public List<Priza> aduBackOfficeData(){
        List<Priza> rez = new ArrayList<Priza>();
        try{
            Connection conn = connectionPool.getConnection();
            Statement stmt = null;

            conn.setAutoCommit(false);
            System.out.println("Opened database successfully");
            stmt = conn.createStatement();
            ResultSet rs= stmt.executeQuery("SELECT * FROM \"priza\".\"detalii\";");
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
                to.setFavorite(rs.getInt("favorite"));
                to.setTotal_prize(rs.getInt("prize_totale"));
                to.setOra_inchidere(rs.getString("ora_inchidere"));
                to.setPrize_ocupate(rs.getInt("prize_ocupate"));
                to.setIsFree(rs.getInt("isfree"));
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
    public void updatePriza(String Nume, int tip, String descriere, int id){
        try{
            Connection conn = connectionPool.getConnection();
            Statement stmt = null;
            conn.setAutoCommit(false);
            stmt = conn.createStatement();
            stmt.executeUpdate("UPDATE \"priza\".\"detalii\" SET nume = "+Nume+", tip = "+tip+", descriere= "+descriere+"WHERE id="+id+";");
            stmt.close();
            conn.commit();
            connectionPool.releaseConnection(conn);
        }catch(Exception e) {
            System.out.println("nu merge===================UPdate");
            e.printStackTrace();
        }
    }



    public void bagaPriza(String Nume, int tip, String descriere,double lat, double lng, int total, int isfree){
        try{
            System.out.println("Am ajuns in back");
            Connection conn = connectionPool.getConnection();
            Statement stmt = null;
            conn.setAutoCommit(false);
            stmt = conn.createStatement();
            stmt.executeUpdate("INSERT INTO \"priza\".\"detalii\"(nume,tip, descriere, lat, lng, prize_totale, isfree ) VALUES ("+Nume+","+ tip+","+ descriere+","+lat+","+lng+","+total+","+isfree+");");
            stmt.close();
            conn.commit();
            connectionPool.releaseConnection(conn);
            System.out.println("am terminat in back");
        }catch(Exception e) {
            System.out.println("nu merge====================Adaugarea");
            e.printStackTrace();
        }
    }

    public void schimbaStatus(int id, int status){
        try{
            Connection conn = connectionPool.getConnection();
            Statement stmt = null;
            conn.setAutoCommit(false);
            stmt = conn.createStatement();
            stmt.executeUpdate("UPDATE \"priza\".\"detalii\" set status = "+status+"WHERE id="+id+";");
            stmt.close();
            conn.commit();
            connectionPool.releaseConnection(conn);
        }catch(Exception e) {
            System.out.println("*=======*");
            e.printStackTrace();
        }
    }

    public void raporteaza(int id){
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
    public void fav(int id)
    {
        int g=1;
        try{
            Connection conn = connectionPool.getConnection();
            Statement stmt = null;
            conn.setAutoCommit(false);
            stmt = conn.createStatement();
            stmt.executeUpdate("UPDATE \"priza\".\"detalii\" set favorite = "+g+"WHERE id="+id+";");
            stmt.close();
            conn.commit();
            connectionPool.releaseConnection(conn);
        }catch(Exception e) {
            System.out.println("*FAVORITEEEE*");
            e.printStackTrace();
        }
    }
    public void ocupa(int id)
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
            ResultSet rs = stmt.executeQuery("SELECT prize_ocupate FROM \"priza\".\"detalii\" WHERE id = "+id+";");
            int tot=1;
            while(rs.next())
                tot=rs.getInt("prize_ocupate");
            stmt.executeUpdate("UPDATE \"priza\".\"detalii\" set prize_ocupate="+(tot+1)+" WHERE id="+id+";");
            conn.commit();
            connectionPool.releaseConnection(conn);
            connectionPool.releaseConnection(conn2);
        }catch (Exception e){
            e.printStackTrace();
        }
    }


}
