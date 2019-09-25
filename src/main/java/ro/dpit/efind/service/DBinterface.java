package ro.dpit.efind.service;

import java.util.List;

public interface DBinterface {

    Priza aduPriza(int id);

    List<Priza> aduPointeri(double latj,double lngj,double lats,double lngs);

    List<Priza> aduBackOfficeData();

    void bagaPriza(String Nume, int tip, String descriere,double lat, double lng, int total, int isfree, String ora);

    void updatePriza(String Nume, int tip, String descriere,int id, int totale, String ora, int isfree);

    void schimbaStatus(int is, int status);

    void raporteaza(int id);

    void fav(int id);

    void ocupa(int id);

}
