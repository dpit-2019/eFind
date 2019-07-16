SELECT pg_terminate_backend (pg_stat_activity.pid)
FROM pg_stat_activity
WHERE pg_stat_activity.datname = 'efind';
DROP DATABASE IF EXISTS efind ;
CREATE DATABASE efind ;
\c efind
CREATE SCHEMA priza ;
CREATE TABLE priza.detalii (
id INT NOT NULL ,
nume TEXT ,
tip VARCHAR (100) ,
descriere TEXT ,
restrictii TEXT ,
lat FLOAT NOT NULL ,
long FLOAT NOT NULL ,
status_priza INT 
);
INSERT INTO priza.detalii VALUES (1 ,'Priza1' ,'USB' ,'pe banca' ,'nu' ,45.12345 ,37.12335) ;
INSERT INTO priza.detalii VALUES (2 ,'Priza2' ,'IMPAMANTARE' ,'pe bloc' ,'nu' ,42.16645 ,75.52335) ;
INSERT INTO priza.detalii VALUES (3 ,'Priza3' ,'USB' ,'pe perete' ,'consumatie 15 lei' ,14.18885 ,20.12335) ;
INSERT INTO priza.detalii VALUES (4 ,'Priza4' ,'USB' ,'sub masa' ,'minim o cafea' ,66.33345 ,11.75655) ;

ALTER TABLE priza.detalii
ALTER COLUMN status_priza
SET DEFAULT 1 ;
--status=0 -> priza activa
--status=1 ->priza pending
--status=2 ->priza raportata
--status=3 ->priza inactiva

