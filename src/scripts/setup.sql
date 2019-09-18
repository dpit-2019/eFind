SELECT pg_terminate_backend (pg_stat_activity.pid)
FROM pg_stat_activity
WHERE pg_stat_activity.datname = 'efind';
DROP DATABASE IF EXISTS efind ;
CREATE DATABASE efind ;
\c efind
CREATE SCHEMA priza ;
CREATE TABLE priza.detalii (
id SERIAL PRIMARY KEY ,
nume TEXT ,
tip VARCHAR (100) ,
descriere TEXT ,
lat NUMERIC NOT NULL ,
lng NUMERIC NOT NULL ,
status INT, 
reports INT,
prize_totale INT,
prize_ocupate INT,
ora_inchidere INT,
favorite INT
);


