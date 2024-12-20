create database genesis

use genesis

create table level(
  idLevel int auto_increment not null,
  nameLevel varchar(20),
  PRIMARY KEY (idLevel)
);

create table product(
  idProduct INT AUTO_INCREMENT NOT NULL,
  nameProduct VARCHAR(20) NOT NULL,
  codeProduct VARCHAR(20) unique NOT NULL,
  priceProduct DECIMAL(10, 2) NOT NULL,
  urlProduct TEXT,
  stockProduct INT DEFAULT 0,
  madeProduct VARCHAR(20) NOT NULL,
  descriptionProduct VARCHAR(255),
  dateIntroProduct DATE NOT NULL,
  stateProduct BOOLEAN DEFAULT TRUE NOT NULL,
  isDeletedProduct BOOLEAN DEFAULT FALSE,
  PRIMARY KEY (idProduct)
);

create table actions(
  idAction INT AUTO_INCREMENT NOT NULL,
  nameAction VARCHAR(10) NOT NULL,
  PRIMARY KEY (idAction)
);

create table user(
  idUser int auto_increment not null,
  idLevel int not null,
  nameUser varchar(100) not null,
  lastNameUser varchar(100) not null,
  emailUser varchar(100) unique not null,
  passwordUser varchar(1024) not null,
  FOREIGN KEY (idLevel) REFERENCES level(idLevel),
  PRIMARY KEY (idUser)
);

create table entryExit(
  idEntryExit int auto_increment not null,
  nameEntryExit varchar(100) not null,
  PRIMARY KEY (idEntryExit)
);

create table productAction(
  idProduct int not null,
  idUser int not null,
  idAction int not null,
  timeAction time not null,
  oldData JSON,
  newData JSON,
  FOREIGN KEY(idProduct) REFERENCES product(idProduct), 
  FOREIGN KEY(idUser) REFERENCES user(idUser),
  FOREIGN KEY(idAction) REFERENCES actions(idAction) 
);

create table entryExitUser(
  idUser int not null,
  idEntryExit int not null,
  timeEntryExit time not null,
  FOREIGN KEY(idUser) REFERENCES user(idUser),
  FOREIGN KEY(idEntryExit) REFERENCES entryExit(idEntryExit)
);

INSERT INTO level (nameLevel) VALUES 
('Administrador'), 
('Dueño'),
('Vendedor');

INSERT INTO actions (nameAction) VALUES
('create'),
('update'),
('delete');

INSERT INTO entryExit (nameEntryExit) VALUES
('entrada'),
('salida');