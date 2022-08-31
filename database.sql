CREATE TABLE IF NOT EXISTS POI (
    id VARCHAR(50) NOT NULL,
    name VARCHAR(50) NOT NULL,
    address VARCHAR(50) NOT NULL,
    lat float(20) NOT NULL,
    lng float(20) NOT NULL,
    PRIMARY KEY(id)
);

DROP TABLE IF EXISTS krousma;
CREATE TABLE krousma (
  username varchar(30) NOT NULL,
  magazi varchar(40) DEFAULT NULL,
  pote timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(username)

) ;

CREATE TABLE IF NOT EXISTS User
(
    id_user INT(255) NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL DEFAULT 'unknown',
    e_mail VARCHAR(255) NOT NULL DEFAULT 'unknown',
    passwd VARCHAR(255) NOT NULL,
    isAdmin TINYINT(1) NOT NULL DEFAULT 0,
    PRIMARY KEY(id_user)
);

DROP TABLE IF EXISTS placetovisit;
CREATE TABLE placetovisit (
  username varchar(30) NOT NULL,
  magazi varchar(40) DEFAULT NULL,
  pote timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  id_poi varchar(40),
  ektimhsh INT(40),
  FOREIGN KEY(id_poi) REFERENCES POI(id)
) ;

