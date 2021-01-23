-- exampĺe for procedures

CREATE OR REPLACE PROCEDURE myproc (id IN NUMBER, varios OUT NUMBER,p OUT CHAR) AS
BEGIN
  SELECT idClient,premium INTO varios, p FROM client WHERE idUser = id;
END;



-- procedure to obatain the informaction of a movie registrated, it search with the name of a movie.

CREATE OR REPLACE PROCEDURE procMovie (nameMovie IN VARCHAR2, IDMOVIE OUT NUMBER, DURATION OUT NUMBER
, MOVIENAME OUT VARCHAR2, POSTERIMAGE OUT VARCHAR2, GENDERNAME OUT VARCHAR2) AS
BEGIN
    select idmovie, duration, moviename, posterimage, gendername  
    INTO IDMOVIE, DURATION, MOVIENAME, POSTERIMAGE, GENDERNAME
    from allMovies WHERE movieName=nameMovie;
END;

--  procedure to obatin a client with the email

CREATE OR REPLACE PROCEDURE procClient (emailClient IN VARCHAR2, IDUSER OUT NUMBER, FIRSTNAME OUT VARCHAR2
, LASTNAME OUT VARCHAR2, AGE OUT NUMBER, EMAIL OUT VARCHAR2, IDCLIENT OUT NUMBER, PREMIUM OUT CHAR) AS
BEGIN
    select u.idUser,u.firstName, u.lastName, u.age, u.email,c.idClient, c.premium 
    INTO IDUSER, FIRSTNAME, LASTNAME, AGE, EMAIL, IDCLIENT,PREMIUM
    from users u, client c 
    WHERE u.idUser=c.idUser AND u.email=emailClient;
END;


CREATE OR REPLACE PROCEDURE procClientId (id IN VARCHAR2, IDUSER OUT NUMBER, FIRSTNAME OUT VARCHAR2
, LASTNAME OUT VARCHAR2, AGE OUT NUMBER, EMAIL OUT VARCHAR2, IDCLIENT OUT NUMBER, PREMIUM OUT CHAR) AS
BEGIN
    select idUser, firstName, lastName, age, email, idClient, premium 
    INTO IDUSER, FIRSTNAME, LASTNAME, AGE, EMAIL, IDCLIENT,PREMIUM
    from allClients 
    WHERE idClient=id;
END;