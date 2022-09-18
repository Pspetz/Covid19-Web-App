
CREATE TABLE IF NOT EXISTS POI (
    id_num int(40) NOT NULL AUTO_INCREMENT,
    type varchar(80) NOT NULL,
    id VARCHAR(50) NOT NULL,
    name VARCHAR(50) NOT NULL,
    address VARCHAR(50) NOT NULL,
    lat float(20) NOT NULL,
    lng float(20) NOT NULL,
    PRIMARY KEY(id_num)
);



CREATE TABLE IF NOT EXISTS User
(
    id_user INT(255) NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL DEFAULT 'unknown',
    e_mail VARCHAR(255) NOT NULL DEFAULT 'unknown',
    passwd VARCHAR(255) NOT NULL,
    isAdmin TINYINT(1) NOT NULL DEFAULT 0,
    PRIMARY KEY(id_user)
);

CREATE TABLE placetovisit (
  username varchar(30) NOT NULL,
  magazi varchar(40) DEFAULT NULL,
  pote timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  id_poi int(40) NOT NULL AUTO_INCREMENT,
  ektimhsh INT(40),
  FOREIGN KEY(id_poi) REFERENCES POI(id_num)
) ;

CREATE TABLE krousma (
  username varchar(30) NOT NULL,
  magazi varchar(40) DEFAULT NULL,
  pote timestamp NULL DEFAULT CURRENT_TIMESTAMP
);
