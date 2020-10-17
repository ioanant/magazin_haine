create table maincategories
(id numeric(3) primary key,
namemc varchar(200));

create table categories
(id numeric(3) primary key,
id_maincategory numeric(3),
namec varchar(200),
foreign key (id_maincategory) references maincategories(id)
);

create table products(
id numeric(3) primary key,
id_category numeric(3),
namep varchar,
descriptionp varchar(1024),
price numeric(6,2) not null,
onsale boolean,
commsale numeric(2),
image_path varchar(1024),
foreign key (id_category) references categories(id)
);

create table orders(
id numeric(3) primary key,
fname varchar(50),
gname varchar(50),
adress varchar(300),
town varchar(100),
country varchar(100),
phone varchar(12),
email varchar(100)
);

create table selected_items(
id numeric(3),
id_product numeric(3),
isnew boolean
);

alter table maincategories  modify createdAt DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6);                                                                             
alter table maincategories  modify updatedAt DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6); 
alter table categories  modify createdAt DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6);                                                                             
alter table categories  modify updatedAt DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6); 
alter table products  modify createdAt DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6);                                                                             
alter table products  modify updatedAt DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6); 
alter table orders  modify createdAt DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6);                                                                             
alter table orders  modify updatedAt DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6); 
alter table selected_items  modify createdAt DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6);                                                                             
alter table selected_items  modify updatedAt DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6); 

INSERT INTO maincategories (namemc) values ('FEMEI');
INSERT INTO maincategories (namemc) values ('BARBATI');
INSERT INTO maincategories (namemc) values ('COPII');
INSERT INTO maincategories (namemc) values ('ACCESORII');

INSERT INTO categories (id_maincategory, namec) values (1,'Cardigane si Pulovere');
INSERT INTO categories (id_maincategory, namec) values (1,'Tricouri');
INSERT INTO categories (id_maincategory, namec) values (1,'Rochii');
INSERT INTO categories (id_maincategory, namec) values (1,'Pantaloni');
INSERT INTO categories (id_maincategory, namec) values (1,'Paltoane si Geci');
INSERT INTO categories (id_maincategory, namec) values (1,'Incaltaminte');
INSERT INTO categories (id_maincategory, namec) values (2,'Camasi');
INSERT INTO categories (id_maincategory, namec) values (2,'Pantaloni');
INSERT INTO categories (id_maincategory, namec) values (2,'Sacouri');
INSERT INTO categories (id_maincategory, namec) values (3, 'Rochii|Salopete');
INSERT INTO categories (id_maincategory, namec) values (3, 'Hanorace');
INSERT INTO categories (id_maincategory, namec) values (3, 'Pijamale');
INSERT INTO categories (id_maincategory, namec) values (4, 'Bijuterii');
INSERT INTO categories (id_maincategory, namec) values (4, 'Curele');
INSERT INTO categories (id_maincategory, namec) values (4, 'Genti');
INSERT INTO categories (id_maincategory, namec) values (4, 'Palarii');

INSERT INTO products (id_category, namep, descriptionp, price, onsale, commsale,image_path) 
 values ('1','Pulover de lana','Pulover confectionat cu tesatura in amestec cu lana. Guler rotund cu volans. Funda contrastanta. Maneca lunga bufanta. Margini reiate.', 300, false, null,'https://static.zara.net/photos///2020/I/0/1/p/2142/115/712/2/w/1143/2142115712_6_1_1.jpg?ts=1602166484035');
INSERT INTO products (id_category, namep, descriptionp, price, onsale, commsale,image_path) 
 values ('6','Ghete joase din piele cu platforma','Culoare neagra. Exterior din piele cu elastice in partile laterale. Gaica la spate. Talpa cu platforma.', 200, true, 10,'https://static.zara.net/photos///2020/I/1/1/p/2114/610/040/2/w/1143/2114610040_1_1_1.jpg?ts=1599826595825');
INSERT INTO products (id_category, namep, descriptionp, price, onsale, commsale,image_path) 
 values ('5','Rochie cu imprimeu','Rochie cu decolteu rotund. Bretele late încrucisate la spate. Talie elastica. Dublura la interior. Margini cu volanase.', 150, false, null,'https://static.zara.net/photos///2020/I/0/1/p/7994/199/653/2/w/1143/7994199653_6_1_1.jpg?ts=1593771582158');
INSERT INTO products (id_category, namep, descriptionp, price, onsale, commsale, image_path) 
 values ('26','Rochie cu buline','Rochie scurta. Maneca scurta bufanta, cu pliu. Dublura la interior. Fronseu in fata. Inchidere la spate cu fermoar ascuns de cusatura.', 150, false, null,'https://static.zara.net/photos///2020/I/0/1/p/7385/305/403/2/w/1143/7385305403_6_1_1.jpg?ts=1592896497401');
 
 
 
 
 
 
 
 