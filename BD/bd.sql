

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


CREATE TABLE cursosfc (
    id_cur SERIAL PRIMARY KEY,
    titulo varchar(200)  NOT NULL,
    about varchar(1000)  NOT NULL,
    competencia varchar(1000)  NOT NULL,
    requisitos varchar(1000)  NOT NULL,
    fecha date  NOT NULL,
    img text  NOT NULL
    
);

CREATE TABLE maestria (
    id_pos SERIAL PRIMARY KEY,
    titulo varchar(200)  NOT NULL,
    about varchar(1000)  NOT NULL,
    competencia varchar(1000)  NOT NULL,
    requisitos varchar(1000)  NOT NULL,
    fecha date  NOT NULL,
    img text  NOT NULL
    
);

CREATE TABLE pregrado (
    videos_asignaturas_1 VARCHAR(255),
    videos_asignaturas_2 VARCHAR(255),
    videos_asignaturas_3 VARCHAR(255),
    videos_asignaturas_4 VARCHAR(255),
    videos_asignaturas_5 VARCHAR(255),
    videos_actividades_1 VARCHAR(255),
    videos_actividades_2 VARCHAR(255),
    videos_actividades_3 VARCHAR(255),
    videos_actividades_4 VARCHAR(255),
    videos_actividades_5 VARCHAR(255),
    videos_perfiles_1 VARCHAR(255),
    videos_perfiles_2 VARCHAR(255),
    videos_perfiles_3 VARCHAR(255),
    videos_perfiles_4 VARCHAR(255),
    videos_perfiles_5 VARCHAR(255),
    images_1 VARCHAR(255),
    images_2 VARCHAR(255),
    images_3 VARCHAR(255),
    images_4 VARCHAR(255),
    images_5 VARCHAR(255),
    educativo VARCHAR(255),
    imgedu VARCHAR(255),
    intercambio VARCHAR(255),
    alianza VARCHAR(255)
);


CREATE TABLE semestre (
    semestre int  NOT NULL,
    area varchar(200)  NOT NULL,
    sigla varchar(200)  NOT NULL,
    materia varchar(200)  NOT NULL,
    requisito varchar(200)  NOT NULL,
    descrip varchar(2000)  NOT NULL
);
