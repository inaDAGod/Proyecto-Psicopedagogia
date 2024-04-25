

CREATE TABLE Docentes (
    id_docente SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apodo VARCHAR(100) NOT NULL,
    cargo VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    datoc VARCHAR(200) NOT NULL,
    imagen TEXT
);


CREATE TABLE pagina_nosotros (
    link_video varchar(100)  NOT NULL,
    link_soc_cien varchar(100)  NOT NULL,
    link_sembrando varchar(100)  NOT NULL,
    link_psico_ucb varchar(100)  NOT NULL,
    facebook varchar(100)  NOT NULL,
    insta varchar(100)  NOT NULL,
    youtube varchar(100)  NOT NULL,
    tiktok varchar(100)  NOT NULL,
    attencion_dire varchar(1000)  NOT NULL
);

CREATE TABLE egresados (
    id_egresado SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    correo VARCHAR(100) ,
    anio_graduacion integer,
    trabajo VARCHAR(100),
    comentario TEXT,
    src_foto TEXT,
    src_tesis TEXT
);

