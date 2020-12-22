/*Se crean las  secuencias*/
CREATE SEQUENCE user_idUser_seq
INCREMENT BY 1
START WITH 1
NOCACHE
NOCYCLE;

CREATE SEQUENCE client_idClient_seq
INCREMENT BY 1
START WITH 1
NOCACHE
NOCYCLE;

CREATE TABLE users ( 
idUser number(6), 
firstName varchar2(20) NOT NULL,
lastName varchar2(20) NOT NULL,
age number(2) NOT NULL, 
email varchar2(30) UNIQUE NOT NULL, 
password varchar2(100) NOT NULL,
CONSTRAINT cte_pk_user PRIMARY KEY(idUser));

CREATE TABLE admin ( 
idAdmin number(6), 
idUser number(6) NOT NULL,
CONSTRAINT user_fk_admin FOREIGN KEY (idUser)
REFERENCES users(idUser),
CONSTRAINT cte_pk_admin PRIMARY KEY(idAdmin)
);

CREATE TABLE client ( 
idClient number(6), 
idUser number(6) NOT NULL,
premium char(1) DEFAULT 'N',
CONSTRAINT cte_pk_client PRIMARY KEY(idClient),
CONSTRAINT user_fk_client FOREIGN KEY(idUser)
REFERENCES users(idUser)
);

CREATE TABLE cinema ( 
idCinema number(6),
idAdmin number(6), 
name varchar2(30) NOT NULL, 
location varchar2(30) NOT NULL, 
CONSTRAINT cte_pk_cinema PRIMARY KEY (idCinema),
CONSTRAINT cinema_fk_admin FOREIGN KEY (idAdmin)
REFERENCES admin(idAdmin));


CREATE TABLE gender ( 
idGender number(6), 
name varchar2(20) UNIQUE NOT NULL,
CONSTRAINT cte_pk_gender PRIMARY KEY (idGender));

CREATE TABLE lobby ( 
idLobby number(2), 
idCinema number(6),
CONSTRAINT cte_pk_lobby PRIMARY KEY (idLobby),
CONSTRAINT lobby_fk_cinema FOREIGN KEY (idCinema)
REFERENCES cinema (idCinema));

CREATE TABLE movie ( 
idMovie number (6), 
idGender number(6) NOT NULL,
duration number(3) NOT NULL, 
name varchar2(20) NOT NULL, 
posterImage varchar2(20) NOT NULL,
CONSTRAINT cte_pk_movie PRIMARY KEY (idMovie),
CONSTRAINT movie_fk_gender FOREIGN KEY (idGender)
REFERENCES gender (idGender));

CREATE TABLE seat ( 
idSeat number(2) NOT NULL, 
idLobby number(2) NOT NULL,
CONSTRAINT cte_pk_seat PRIMARY KEY (idSeat),
CONSTRAINT seat_fk_lobby FOREIGN KEY (idLobby)
REFERENCES lobby (idLobby));

CREATE TABLE ticket ( 
idTicket number(6) NOT NULL, 
idClient number(6) NOT NULL, 
idSeat number(2) NOT NULL,
CONSTRAINT cte_pk_ticket PRIMARY KEY (idTicket),
CONSTRAINT client_fk_ticket FOREIGN KEY (idClient)
REFERENCES client (idClient),
CONSTRAINT seat_fk_ticket FOREIGN KEY (idSeat)
REFERENCES seat (idSeat));

CREATE TABLE movie_lobby (
idMovie number (6) NOT NULL, 
idLobby number(2) NOT NULL,
schedule date NOT NULL, 
CONSTRAINT movlo_fk_movie FOREIGN KEY (idMovie)
REFERENCES movie (idMovie),
CONSTRAINT movlo_fk_lobyy FOREIGN KEY (idLobby)
REFERENCES lobby (idLobby));
