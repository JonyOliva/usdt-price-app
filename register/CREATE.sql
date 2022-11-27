CREATE DATABASE P2P;

CREATE TABLE Prices(
Id int auto_increment primary key,
Date datetime not null,
Price float not null,
IdOrigin int not null
)
