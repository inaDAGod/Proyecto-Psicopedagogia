
insert into egresados (nombre, correo, anio_graduacion,  trabajo,  comentario, src_foto) values
('Nombre egresado 1', 'correo 1', 2011, 'trabajo 1', 'comentarioooooo1', './assets/images/egresado.webp'),
('Nombre egresado 2', 'correo 2', 2012, 'trabajo 2', 'comentarioooooo2', './assets/images/egresado.webp'),
('Nombre egresado 3', 'correo 3', 2013, 'trabajo 3', 'comentarioooooo3', './assets/images/egresado.webp'),
('Nombre egresado 4', 'correo 4', 2014, 'trabajo 4', 'comentarioooooo4', './assets/images/egresado.webp');


INSERT INTO Docentes (nombre, apodo, cargo, correo, datoc, imagen)
VALUES
    ('Dra. Alejandra Martínez Barrientos', 'Ale', 'Directora de Carrera', 'mmartinez@ucb.edu.bo', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', '.\backend\images\Alejandra-Martinez-1.jpg'),
    ('MSc. Karina García Riveros', 'Kari', 'Docente Tiempo Completo', 'rgarcia@ucb.edu.bo', 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', '.\backend\images\Karina-Garcia.jpg');


INSERT INTO pagina_nosotros (link_video, link_soc_cien, link_sembrando, link_psico_ucb, facebook, insta, youtube, tiktok, attencion_dire)
VALUES
    ('https://www.youtube.com/watch?v=nPL5hCXxmBw', 'https://www.facebook.com/Inpsicopedia', '', 'https://lpz.ucb.edu.bo/pregrado/psicopedagogia', 'https://www.facebook.com/PSPLaPaz', 'https://www.instagram.com/ucb.psp/', 'https://www.youtube.com/@UCBLaPazBo', 'https://www.tiktok.com/@psicopedagogialapazucb', 'Departamento de Psicopedagogía: Av. 14 de Septiembre y Calle 2 de Obrajes - Bloque N - Jardín posterior Horarios de atención: de lunes a viernes de 08:30 a 16:30 Contacto: 2782222 Int. 2872 WhatsApp: 73231313 - 77294940');


INSERT INTO cursosfc (titulo, about, competencia, requisitos, fecha, img) 
VALUES 
('Curso de Intervención Psicopedagógica', 'Este curso proporciona herramientas prácticas para intervenir en procesos de aprendizaje y desarrollo.', 'Evaluación psicopedagógica, diseño de estrategias de intervención, y seguimiento de procesos de aprendizaje.', 'Conocimientos básicos en psicología y pedagogía.', '2024-05-01', '\backend\images\fc1.jpg'),
('Curso de Dificultades de Aprendizaje', 'Aprende a identificar, entender y abordar las dificultades de aprendizaje en contextos educativos.', 'Diagnóstico diferencial, diseño de adaptaciones curriculares, y trabajo colaborativo con familias y profesionales.', 'Formación previa en educación especial o psicopedagogía.', '2024-06-01', '\backend\images\fc2.jpg'),
('Curso de Orientación Vocacional', 'Descubre técnicas y herramientas para guiar a personas en la elección de su carrera profesional.', 'Análisis de intereses, habilidades y valores, y exploración de opciones académicas y laborales.', 'Interés por la orientación educativa y habilidades de comunicación.', '2024-07-01', '\backend\images\fc3.jpg');



INSERT INTO maestria (titulo, about, competencia, requisitos, fecha, img) 
VALUES 
('Maestría en Psicopedagogía Clínica', 'Este programa te forma para intervenir en el ámbito clínico, diagnósticando y tratando dificultades de aprendizaje y trastornos del desarrollo.', 'Evaluación psicopedagógica, diseño de programas de intervención, y trabajo interdisciplinario.', 'Grado universitario en psicología, educación o áreas afines.', '2024-09-01', '\backend\images\mas1.jpg'),
('Maestría en Neuropsicopedagogía', 'Aprende sobre el funcionamiento del cerebro y su relación con los procesos de aprendizaje y desarrollo.', 'Neurociencia educativa, diseño de intervenciones basadas en evidencia, y evaluación neuropsicológica.', 'Conocimientos avanzados en neurociencia y psicopedagogía.', '2024-10-01', '\backend\images\mas2.jpg'),
('Maestría en Psicopedagogía Institucional', 'Desarrolla habilidades de gestión y liderazgo para trabajar en instituciones educativas y optimizar los procesos de enseñanza-aprendizaje.', 'Gestión educativa, diseño y evaluación de proyectos educativos, y desarrollo profesional docente.', 'Experiencia en el ámbito educativo y capacidad para liderar equipos.', '2024-11-01', '\backend\images\mas3.jpg');
