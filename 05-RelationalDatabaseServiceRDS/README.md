# Amazon Web Services
Aprende a usar los servicios web de Amazon.

### 1 - Relational Database Service - RDS
```
-- Crear un usuario para la aplicacion node
CREATE ROLE role_nodeapp;
CREATE USER user_nodeapp WITH ENCRYPTED PASSWORD '_Passw0rd_';
GRANT role_nodeapp TO user_nodeapp;

-- Crear un esquema y la tabla de usuarios
CREATE SCHEMA auth;
CREATE TABLE auth.user (
    username VARCHAR ( 50 ) UNIQUE NOT NULL,
	email VARCHAR ( 255 ) UNIQUE NOT NULL,
	created_on TIMESTAMP NOT NULL
);
-- Agregar algunos usuarios
INSERT INTO auth.user (username, email, created_on) 
VALUES 
('usuario1', 'usuario1@example.com', NOW()),
('usuario2', 'usuario2@example.com', NOW()),
('usuario3', 'usuario3@example.com', NOW());
-- Ver los usuarios
SELECT * FROM auth.user;

-- Agregar permisos para el role
GRANT USAGE ON SCHEMA auth TO role_nodeapp;
GRANT SELECT,UPDATE,INSERT,DELETE ON ALL TABLES IN SCHEMA auth TO role_nodeapp;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA auth TO role_nodeapp;
GRANT EXECUTE ON ALL PROCEDURES IN SCHEMA auth TO role_nodeapp;
```

### 2 - Relational Database Service - RDS. NodeJs:
```
-- Instala los paquetes
> npm run install

-- Corre la aplicación Node
> npm run start

-- Lista los usuarios
> http://localhost:3000/users

-- Muestra un usuario por username
> http://localhost:3000/users/<username>

-- Agrega un usuario
> http://localhost:3000/users/add

-- Actualiza un usuario por username
> http://localhost:3000/users/update/<username>

-- Borra un usuario por username
> http://localhost:3000/users/delete/<username>
```
