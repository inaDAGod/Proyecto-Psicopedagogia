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
-- el src de la imagen esta mal, no puedo sacarla
insert into egresados (nombre, correo, anio_graduacion,  trabajo,  comentario, src_foto) values
('Nombre egresado 1', 'correo 1', 2011, 'trabajo 1', 'comentarioooooo1', './assets/images/egresado.webp'),
('Nombre egresado 2', 'correo 2', 2012, 'trabajo 2', 'comentarioooooo2', './assets/images/egresado.webp'),
('Nombre egresado 3', 'correo 3', 2013, 'trabajo 3', 'comentarioooooo3', './assets/images/egresado.webp'),
('Nombre egresado 4', 'correo 4', 2014, 'trabajo 4', 'comentarioooooo4', './assets/images/egresado.webp');
