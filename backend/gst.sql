-- to create database:


create database 'placementseason'


-- to create table:



CREATE TABLE Products (
    product_code varchar(30),
    product_name varchar(30),
    product_price int,
    product_gst int,
    PRIMARY KEY (product_code)
);