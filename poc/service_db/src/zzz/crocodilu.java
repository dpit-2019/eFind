package zzz;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class crocodilu {
    public static void main(String[] args) throws SQLException {
        Connection conn = DriverManager.getConnection("jdbc:postgresql://localhost/alex_db?user=postgres&password=admin");
        conn.close();
    }
}
