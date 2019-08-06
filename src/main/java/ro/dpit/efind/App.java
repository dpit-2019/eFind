package ro.dpit.efind;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.web.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import ro.dpit.efind.service.BasicConnectionPool;
import ro.dpit.efind.service.PrizaController;

import java.sql.SQLException;

/**
 * Hello world!
 *
 */
@Configuration
@ComponentScan
@EnableAutoConfiguration
public class App extends SpringBootServletInitializer {
    public static void main(String[] args) {
        SpringApplication.run(applicationClass, args);
    }


    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(applicationClass);
    }

    private static Class<App> applicationClass = App.class;


}
