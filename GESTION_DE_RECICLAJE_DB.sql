/**
Tabla de Usuarios (UsuarioID PK, Nombre, Correo, Contraseña, Puntos_Totales, Fecha_Registro) - Tabla Fuerte

Tabla de Material_Reciclable (MaterialID PK, Nombre, Valor_Kilo) - Tabla Fuerte

Tabla de CentroAcopio (AcopioID PK, Nombre, Ubicacion) - Tabla Fuerte

Tabla de Reciclaje (ReciclajeID PK, UsuarioID FK, MaterialID FK, AcopioID FK, Cantidad_Reciclada, Fecha_Reciclaje, Puntos_Obtenidos) - Tabla Débil

Tabla de Estadísticas por Centro de Acopio (EstadisticaID PK, AcopioID FK, Cantidad_Usuarios, Material_Reciclado_Acopio, Fecha_Reporte) - Tabla Débil

Tabla de Estadísticas por Usuario (EstadisticaID PK, UsuarioID FK, Material_Reciclado_Usuario, Puntos_Acumulados, Fecha_Reporte) - Tabla Débil

Tabla de Recompensa (RecompensaID PK, Nombre, Valor_Puntos, Disponibilidad) - Tabla Fuerte

Tabla de Canje (CanjeID PK, UsuarioID FK, RecompensaID FK, Fecha_Canje, Estado_Canje) - Tabla Débil
**/


-- Crear la base de datos
CREATE DATABASE GESTION_DE_RECICLAJE_DB
GO

-- Usar la base de datos
USE GESTION_DE_RECICLAJE_DB
GO

-- Tabla de Usuarios
CREATE TABLE USUARIOS
(
    USUARIO_ID INT IDENTITY(1,1) PRIMARY KEY,
    NOMBRE VARCHAR(200) NOT NULL, 
    CORREO VARCHAR(100) UNIQUE NOT NULL, -- Evita duplicación de correos
    CONTRASEÑA VARCHAR(100) NOT NULL,
    PUNTOS_TOTALES INT DEFAULT 0, -- Inicia con 0 puntos
    FECHA_REGISTRO DATE DEFAULT GETDATE() -- Fecha de registro por defecto a la actual
)
GO

-- Tabla de Material_Reciclable
CREATE TABLE MATERIAL_RECICLABLE
(
    MATERIAL_ID INT IDENTITY(1,1) PRIMARY KEY,
    NOMBRE VARCHAR(100) NOT NULL,
    VALOR_KILO INT NOT NULL -- Puntos por cada kilo de material
)
GO

-- Tabla de Centro de Acopio
CREATE TABLE CENTRO_ACOPIO
(
    ACOPIO_ID INT IDENTITY(1,1) PRIMARY KEY,
    NOMBRE VARCHAR(150) NOT NULL,
    UBICACION VARCHAR(100) NOT NULL -- Por ejemplo, San José, Alajuela, etc.
)
GO

-- Tabla de Reciclaje
CREATE TABLE RECICLAJE
(
    RECICLAJE_ID INT IDENTITY(1,1) PRIMARY KEY,
    USUARIO_ID INT FOREIGN KEY REFERENCES USUARIOS(USUARIO_ID),
    MATERIAL_ID INT FOREIGN KEY REFERENCES MATERIAL_RECICLABLE(MATERIAL_ID),
    ACOPIO_ID INT FOREIGN KEY REFERENCES CENTRO_ACOPIO(ACOPIO_ID),
    CANTIDAD_RECICLADA DECIMAL(10,2) NOT NULL, -- Cantidad en kilos, permite decimales
    FECHA_RECICLAJE DATE DEFAULT GETDATE(), -- Fecha de reciclaje
    PUNTOS_OBTENIDOS INT NOT NULL -- Puntos ganados por el reciclaje
)
GO

-- Tabla de Estadísticas por Centro de Acopio
CREATE TABLE ESTADISTICAS_ACOPIO
(
    ESTADISTICA_ID INT IDENTITY(1,1) PRIMARY KEY,
    ACOPIO_ID INT FOREIGN KEY REFERENCES CENTRO_ACOPIO(ACOPIO_ID),
    CANTIDAD_USUARIOS INT NOT NULL, -- Número de usuarios que reciclaron en este centro
    MATERIAL_RECICLADO_ACOPIO DECIMAL(10,2) NOT NULL,  -- Cantidad total de material reciclado en el centro
    FECHA_REPORTE DATE DEFAULT GETDATE() -- Fecha de generación del reporte
);
GO

-- Tabla de Estadísticas por Usuario
CREATE TABLE ESTADISTICAS_USUARIO
(
    ESTADISTICA_ID INT IDENTITY(1,1) PRIMARY KEY,
    USUARIO_ID INT FOREIGN KEY REFERENCES USUARIOS(USUARIO_ID),
    MATERIAL_RECICLADO_USUARIO DECIMAL(10,2) NOT NULL, -- Cantidad total reciclada por el usuario
    PUNTOS_ACUMULADOS INT NOT NULL,  -- Puntos totales acumulados por el usuario
    FECHA_REPORTE DATE DEFAULT GETDATE() -- Fecha de generación del reporte
);
GO


-- Tabla de Recompensa
CREATE TABLE RECOMPENSA
(
    RECOMPENSA_ID INT IDENTITY(1,1) PRIMARY KEY,
    NOMBRE VARCHAR(150) NOT NULL, -- Nombre de la recompensa
    VALOR_PUNTOS INT NOT NULL, -- Puntos requeridos para canjear la recompensa
    DISPONIBILIDAD VARCHAR(50) NOT NULL CHECK (DISPONIBILIDAD IN ('Disponible', 'Agotada')) -- Estado de la recompensa
)
GO

-- Tabla de Canje de Recompensas
CREATE TABLE CANJE
(
    CANJE_ID INT IDENTITY(1,1) PRIMARY KEY,
    USUARIO_ID INT FOREIGN KEY REFERENCES USUARIOS(USUARIO_ID),
    RECOMPENSA_ID INT FOREIGN KEY REFERENCES RECOMPENSA(RECOMPENSA_ID),
    FECHA_CANJE DATE DEFAULT GETDATE(), -- Fecha en la que se realizó el canje
    ESTADO_CANJE VARCHAR(50) NOT NULL CHECK (ESTADO_CANJE IN ('Completado', 'Pendiente', 'Cancelado')) -- Estado del canje
)
GO
