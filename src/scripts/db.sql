INSERT INTO priza.detalii (lat, long) VALUES (45.12345 ,37.12335) ;
INSERT INTO priza.detalii (lat, long) VALUES (42.16645 ,75.52335) ;
INSERT INTO priza.detalii (lat, long) VALUES (14.18885 ,20.12335) ;
INSERT INTO priza.detalii (lat, long) VALUES (66.33345 ,11.75655) ;

ALTER TABLE priza.detalii
ALTER COLUMN status_priza
SET DEFAULT 1 ;
--status=0 -> priza activa
--status=1 ->priza pending
--status=2 ->priza raportata
--status=3 ->priza inactiva