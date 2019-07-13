DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products
(
    item_id int not null,
    product_name varchar(100) null,
    department_name varchar(50) null,
    price decimal(10,2) null,
    stock_quantity int null,
    primary key (item_id)
);

-- CREATE TABLE top_albums (
--   position INT NOT NULL,
--   artist VARCHAR(100) NULL,
--   album VARCHAR(100) NULL,
--   year INT NULL,
--   raw_total DECIMAL(10,4) NULL,
--   raw_usa DECIMAL(10,4) NULL,
--   raw_uk DECIMAL(10,4) NULL,
--   raw_eur DECIMAL(10,4) NULL,
--   raw_row DECIMAL(10,4) NULL,
--   PRIMARY KEY (position)
-- );

SELECT * FROM products;
-- select * from top_albums;
