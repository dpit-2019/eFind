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
long FLOAT NOT NULL );