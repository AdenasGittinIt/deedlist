
DROP DATABASE IF EXISTS deedlist_db;
CREATE DATABASE deedlist_db;
USE deedlist_db;

CREATE TABLE people (
  id INT AUTO_INCREMENT NOT NULL,
  first_name VARCHAR (30) NOT NULL,
  last_name VARCHAR (30) NOT NULL,
  zip_code INT (30) NOT NULL,
  email VARCHAR (13) NOT NULL,
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

USE deedlist_db;

INSERT INTO people(first_name, last_name, zip_code, cell_number)
VALUES
("Robert", "Smith", 80310, 720-555-1234),
("Peyton","Manning", 80234, 303-843-1302),
("Tyrone", "Biggums", 21202, 410-555-4321),
("Luke", "Skywalker", 90210, 210-555-5555);

INSERT INTO need (title, category, details, status)
VALUES
("Handyman", "Home", "Broken Pipe", "pending"),
("Meals", "Food", "Need dinner for Christmas", "pending"),
("Presents", "Purchase", "Need presents for children", "pending"),
("Babysitting", "Child Care", "Need babysitter for Christmas", "pending");