package ro.dpit.efind.service;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;


@RestController
public class PrizaController {
    @RequestMapping("/getPriza")
    public Priza getDetails(@RequestParam(value="id") Long id){
        Priza res=new Priza();
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
            ResultSet rs = ((java.sql.Statement) stmt).executeQuery( "SELECT * FROM \"prizaEfind\".\"detalii\";" );
            while ( rs.next() ) {

                    String name = rs.getString("nume");
                    int type = rs.getInt("tip");
                    res.setId(id);
                    res.setName(name);
                    res.setTip(type);
                    return res;
            }
            rs.close();
            stmt.close();
            c.close();
        } catch ( Exception e ) {
            System.out.println("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
            e.printStackTrace();
            System.err.println( e.getClass().getName()+": "+ e.getMessage() );
        }
        System.out.println("Operation done successfully");
        return res;
    }

}

