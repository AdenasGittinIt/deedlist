
DROP DATABASE IF EXISTS deedlist_db;
CREATE DATABASE deedlist_db;
USE deedlist_db;

CREATE TABLE people (
  id int AUTO_INCREMENT NOT NULL,
  name VARCHAR (30) NOT NULL,
  zipcode INT (30) NOT NULL,
  cellNumber INT (10) NOT NULL,
  PRIMARY KEY(id)
);
CREATE TABLE need (
  id int AUTO_INCREMENT NOT NULL,
  title varchar(30) NOT NULL,
  category VARCHAR(30) NOT NULL,
  details VARCHAR (30) NOT NULL,
  status VARCHAR (30) NOT NULL,
  PRIMARY KEY(id)
);
