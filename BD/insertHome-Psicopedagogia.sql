CREATE TABLE home (
    home varchar(5) PRIMARY KEY,
    imagen1 TEXT NOT NULL,
    imagen2 TEXT NOT NULL,
    imagen3 TEXT NOT NULL,
    imagen4 TEXT NOT NULL,
    imagen5 TEXT NOT NULL,
    imagen6 TEXT NOT NULL,
    quienes_somos TEXT NOT NULL,
    mision TEXT NOT NULL,
    mision_src TEXT NOT NULL,
    vision TEXT NOT NULL,
    vision_src TEXT NOT NULL,
    perfil_estudiante TEXT NOT NULL,
    perfil_estudiante_src TEXT NOT NULL
);
INSERT INTO home (home, imagen1, imagen2, imagen3, imagen4, imagen5, imagen6, quienes_somos, mision, mision_src, vision, vision_src, perfil_estudiante, perfil_estudiante_src)
VALUES (
	'home0',
    '/src/assets/images/psico1.jpg',
    '/src/assets/images/psico2.jpg',
    '/src/assets/images/psico3.jpg',
    '/src/assets/images/psico4.jpg',
    '/src/assets/images/psico2.jpg',
    '/src/assets/images/psico3.jpg',
    'QUIENES SOMOS educación inicial, primaria, secundaria, universitaria, técnica tecnológica que desarrollan procesos formativos en instituciones públicas, privadas y de convenio. En proyectos y programas educativos que mejoran la calidad de vida de diferentes poblaciones desde ministerios, municipios, fundaciones y ONG´s. En empresas públicas y privadas que desarrollan gestión del conocimiento desde sus departamentos de Recursos Humanos y sus unidades de capacitación. Desarrollando su propio emprendimiento Centros psicopedagógicos y Centros de Educación integral que trabajan con niñez, adolescencia, juventud y adultos que presenten.',
    'MISION----- educación inicial, primaria, secundaria, universitaria, técnica tecnológica que desarrollan procesos formativos en instituciones públicas, privadas y de convenio. En proyectos y programas educativos que mejoran la calidad de vida de diferentes poblaciones desde ministerios, municipios, fundaciones y ONG´s. En empresas públicas y privadas que desarrollan gestión del conocimiento desde sus departamentos de Recursos Humanos y sus unidades de capacitación. Desarrollando su propio emprendimiento Centros p',
    '/src/assets/images/psicopedagogía.jpg',
    'VISION----- educación inicial, primaria, secundaria, universitaria, técnica tecnológica que desarrollan procesos formativos en instituciones públicas, privadas y de convenio. En proyectos y programas educativos que mejoran la calidad de vida de diferentes poblaciones desde ministerios, municipios, fundaciones y ONG´s. En empresas públicas y privadas que desarrollan gestión del conocimiento desde sus departamentos de Recursos Humanos y sus unidades de capacitación. Desarrollando su propio emprendimiento Centros p',
    '/src/assets/images/psicopedagogía.jpg',
    'PERFIL ESTUDIANTE----- educación inicial, primaria, secundaria, universitaria, técnica tecnológica que desarrollan procesos formativos en instituciones públicas, privadas y de convenio. En proyectos y programas educativos que mejoran la calidad de vida de diferentes poblaciones desde ministerios, municipios, fundaciones y ONG´s. En empresas públicas y privadas que desarrollan gestión del conocimiento desde sus departamentos de Recursos Humanos y sus unidades de capacitación. Desarrollando su propio emprendimiento Centros p',
    '/src/assets/images/psicopedagogía.jpg'
);




-- Crear la tabla "news"
CREATE TABLE noticias (
    id_noticia SERIAL PRIMARY KEY,
    noticia VARCHAR(255) NOT NULL,
    contenido TEXT,
    fecha DATE,
    noticia_src VARCHAR(255)
);

-- Crear la tabla "activities"
CREATE TABLE actividades (
    id_actividades SERIAL PRIMARY KEY,
    actividad VARCHAR(255) NOT NULL,
    fecha DATE,
    hora TIME,
    ubicacion VARCHAR(255),
    descripcion TEXT,
    actividad_src VARCHAR(255)
);


-- Insertar datos de ejemplo en la tabla "noticias"
INSERT INTO noticias (noticia, contenido, fecha, noticia_src)
VALUES 
    ('Investigación revela la importancia del juego en el desarrollo infantil', 'Un estudio reciente sugiere que el juego libre y no estructurado es crucial para el desarrollo cognitivo y emocional de los niños.', '2024-04-15', './assets/images/psicopedagogía3.jpg'),
    ('Nuevas técnicas de enseñanza promueven la inclusión en el aula', 'Docentes implementan métodos innovadores para fomentar la participación de todos los estudiantes, incluyendo aquellos con necesidades especiales.', '2024-04-20', './assets/images/psicopedagogía3.jpg'),
    ('Conferencia sobre atención plena en el aprendizaje', 'Expertos en educación presentarán estrategias para integrar la atención plena en el proceso de enseñanza-aprendizaje.', '2024-04-25', './assets/images/psicopedagogía3.jpg'),
    ('Avances en neurociencia educativa: impacto en la práctica pedagógica', 'Neurocientíficos y educadores analizarán cómo los descubrimientos recientes en neurociencia pueden informar y mejorar las prácticas educativas.', '2024-04-28', './assets/images/psicopedagogía3.jpg'),
    ('Estudio encuentra vínculo entre la música y el rendimiento académico', 'Investigadores descubren que la exposición regular a la música está asociada con mejoras en el rendimiento académico de los estudiantes.', '2023-05-02', './assets/images/psicopedagogía3.jpg'),
    ('Programa de lectura recreativa en escuelas primarias', 'Una iniciativa busca fomentar el hábito de la lectura entre los niños mediante actividades lúdicas y motivadoras.', '2023-05-05', './assets/images/psicopedagogía3.jpg'),
    ('Investigación sobre el impacto del juego en el desarrollo del lenguaje', 'Estudio examina cómo el juego simbólico puede influir en el desarrollo del lenguaje en la primera infancia.', '2023-05-10', './assets/images/psicopedagogía3.jpg'),
    ('Importancia de la educación emocional en el currículo escolar', 'Expertos destacan la necesidad de incluir la educación emocional como parte integral del currículo escolar para promover el bienestar de los estudiantes.', '2024-04-15', './assets/images/psicopedagogía3.jpg');

-- Insertar datos de ejemplo en la tabla "actividades"
INSERT INTO actividades (actividad, fecha, hora, ubicacion, descripcion, actividad_src)
VALUES 
    ('Taller de resolución de conflictos', '2024-04-18', '10:00:00', 'Aula 101', 'El taller proporcionará estrategias prácticas para resolver conflictos de manera constructiva en el ámbito escolar.', './assets/images/psico4.jpg'),
    ('Charla sobre inteligencias múltiples', '2024-04-22', '15:00:00', 'Salón de actos', 'Expertos en educación explicarán la teoría de las inteligencias múltiples de Howard Gardner y su aplicación en el aula.', './assets/images/psico3.jpg'),
    ('Sesión de mindfulness para docentes', '2024-04-25', '09:30:00', 'Sala de profesores', 'Los profesores aprenderán técnicas de mindfulness para reducir el estrés y mejorar su bienestar emocional.', './assets/images/psico2.jpg'),
    ('Taller de creatividad en el aula', '2024-04-28', '14:00:00', 'Aula 203', 'Los participantes explorarán estrategias para fomentar la creatividad y la innovación en el proceso de enseñanza-aprendizaje.', './assets/images/psico2.jpg'),
    ('Curso de inclusión educativa', '2024-05-02', '10:30:00', 'Sala de conferencias', 'El curso abordará prácticas inclusivas para atender a la diversidad de estudiantes en el aula.', './assets/images/psico4.jpg'),
    ('Conferencia sobre gamificación en la educación', '2024-05-05', '16:00:00', 'Auditorio principal', 'Expertos discutirán cómo la gamificación puede mejorar la motivación y el compromiso de los estudiantes en el proceso de aprendizaje.', './assets/images/psico3.jpg');
	


CREATE TABLE investigaciones (
    id_investigaciones varchar(5) PRIMARY KEY,
    imagen1 TEXT,
    imagen2 TEXT,
    imagen3 TEXT,
    imagen4 TEXT,
    imagen5 TEXT,
    imagen6 TEXT,
    quienes_somos TEXT,
    desdecuando TEXT,
    quienes_conforman TEXT,
    como_unirse TEXT,
    presente_investigacion TEXT,
    presente_investigacion_src TEXT
); 

INSERT INTO investigaciones (id_investigaciones, imagen1, imagen2, imagen3, imagen4, imagen5, imagen6, quienes_somos, desdecuando, quienes_conforman, como_unirse, presente_investigacion, presente_investigacion_src)
VALUES 
('inv0', '/src/assets/images/psico2.jpg', '/src/assets/images/psico3.jpg', '/src/assets/images/psico3.jpg', './assets/images/psico4.jpg', '/src/assets/images/psico2.jpg', '/src/assets/images/psico3.jpg', 'Somos una organización dedicada a la investigación científica. sd gs gfdsfsdfdsf dsfdsfds fdsfsdfsd dsfdsfdsfds  dfsfsdfsdf', 'Desde hace más de una década jdajdl  dsfsdf  dsf sd ds f dsf dsf sd f fds fds f sd .', 'Nuestro equipo está conformado por expertos en diversas áreas de conocimiento.', 'Para unirse a nuestro equipo, puede enviar su solicitud a nuestro correo electrónico.', 'Nuestro proyecto actual se centra en el estudio del cambio climático.', './assets/images/psico3.jpg');
