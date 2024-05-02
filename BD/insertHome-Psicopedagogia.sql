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
    '/src/assets/images/psico1.jpg',
    'VISION----- educación inicial, primaria, secundaria, universitaria, técnica tecnológica que desarrollan procesos formativos en instituciones públicas, privadas y de convenio. En proyectos y programas educativos que mejoran la calidad de vida de diferentes poblaciones desde ministerios, municipios, fundaciones y ONG´s. En empresas públicas y privadas que desarrollan gestión del conocimiento desde sus departamentos de Recursos Humanos y sus unidades de capacitación. Desarrollando su propio emprendimiento Centros p',
    '/src/assets/images/psico1.jpg',
    'PERFIL ESTUDIANTE----- educación inicial, primaria, secundaria, universitaria, técnica tecnológica que desarrollan procesos formativos en instituciones públicas, privadas y de convenio. En proyectos y programas educativos que mejoran la calidad de vida de diferentes poblaciones desde ministerios, municipios, fundaciones y ONG´s. En empresas públicas y privadas que desarrollan gestión del conocimiento desde sus departamentos de Recursos Humanos y sus unidades de capacitación. Desarrollando su propio emprendimiento Centros p',
    '/src/assets/images/psico1.jpg'
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


-- Crear la tabla para las interacciones sociales
CREATE TABLE interaccion_social (
    id_interaccion varchar (5) PRIMARY KEY,
    objetivo TEXT,
    lineas TEXT
);
-- Crear la tabla para las actividades
CREATE TABLE actividad_interaccion_social (
    id_actividad SERIAL PRIMARY KEY,
    actividad VARCHAR(255) NOT NULL,
    fecha DATE,
    hora TIME,
    ubicacion VARCHAR(255),
    descripcion TEXT,
    actividad_src VARCHAR(255),
    tipo VARCHAR(50) NOT NULL,
    id_interaccion varchar (5) REFERENCES interaccion_social(id_interaccion) ON DELETE CASCADE
);

-- Insertar datos en la tabla interaccion_social
INSERT INTO interaccion_social (id_interaccion, objetivo, lineas) VALUES
('it0', 'OBJETIVO Conviértete en un profesional en Psicopedagogía capaz de diseñar, desarrollar y gestionar propuestas educativas presenciales y virtuales en sus cuatro campos profesionales: clínica, educativa, social y laboral desde una formación basada en competencias, desde un espíritu humanista, crítico e innovador. Sé parte de la renovación educativa y aporta a la transformación social.', 'LINEAS Conviértete en un profesional en Psicopedagogía capaz de diseñar, desarrollar y gestionar propuestas educativas presenciales y virtuales en sus cuatro campos profesionales: clínica, educativa, social y laboral desde una formación basada en competencias, desde un espíritu humanista, crítico e innovador. Sé parte de la renovación educativa y aporta a la transformación social.');

-- Insertar datos en la tabla actividad_interaccion_social
INSERT INTO actividad_interaccion_social (actividad, fecha, hora, ubicacion, descripcion, actividad_src, tipo, id_interaccion) VALUES
('Taller de resolución de conflictos', '2024-04-18', '10:00:00', 'Aula 101', 'El taller proporcionará estrategias prácticas para resolver conflictos de manera constructiva en el ámbito escolar.', '/src/assets/images/psico1.jpg', 'Universidad', 'it0'),
('Charla sobre inteligencias múltiples', '2024-04-22', '15:00:00', 'Salón de actos', 'Expertos en educación explicarán la teoría de las inteligencias múltiples de Howard Gardner y su aplicación en el aula.', '/src/assets/images/psico2.jpg', 'Universidad', 'it0'),
('Sesión de mindfulness para docentes', '2024-04-25', '09:30:00', 'Sala de profesores', 'Los profesores aprenderán técnicas de mindfulness para reducir el estrés y mejorar su bienestar emocional.', '/src/assets/images/psico1.jpg', 'Universidad', 'it0'),
('Taller de creatividad en el aula', '2024-04-28', '14:00:00', 'Aula 203', 'Los participantes explorarán estrategias para fomentar la creatividad y la innovación en el proceso de enseñanza-aprendizaje.', '/src/assets/images/psico2.jpg', 'Universidad', 'it0'),
('Curso de inclusión educativa', '2024-05-02', '10:30:00', 'Sala de conferencias', 'El curso abordará prácticas inclusivas para atender a la diversidad de estudiantes en el aula.', '/src/assets/images/psico2.jpg', 'Universidad', 'it0'),
('Conferencia sobre gamificación en la educación', '2024-05-05', '16:00:00', 'Auditorio principal', 'Expertos discutirán cómo la gamificación puede mejorar la motivación y el compromiso de los estudiantes en el proceso de aprendizaje.', '/src/assets/images/psico1.jpg', 'Universidad', 'it0'),
('Taller de resolución de conflictos', '2024-04-18', '10:00:00', 'Aula 101', 'El taller proporcionará estrategias prácticas para resolver conflictos de manera constructiva en el ámbito escolar.', '/src/assets/images/psico1.jpg', 'Departamental', 'it0'),
('Charla sobre inteligencias múltiples', '2024-04-22', '15:00:00', 'Salón de actos', 'Expertos en educación explicarán la teoría de las inteligencias múltiples de Howard Gardner y su aplicación en el aula.', '/src/assets/images/psico2.jpg', 'Departamental', 'it0'),
('Sesión de mindfulness para docentes', '2024-04-25', '09:30:00', 'Sala de profesores', 'Los profesores aprenderán técnicas de mindfulness para reducir el estrés y mejorar su bienestar emocional.', '/src/assets/images/psico1.jpg', 'Departamental', 'it0'),
('Taller de creatividad en el aula', '2024-04-28', '14:00:00', 'Aula 203', 'Los participantes explorarán estrategias para fomentar la creatividad y la innovación en el proceso de enseñanza-aprendizaje.', '/src/assets/images/psico2.jpg', 'Departamental', 'it0'),
('Curso de inclusión educativa', '2024-05-02', '10:30:00', 'Sala de conferencias', 'El curso abordará prácticas inclusivas para atender a la diversidad de estudiantes en el aula.', '/src/assets/images/psico2.jpg', 'Departamental', 'it0'),
('Conferencia sobre gamificación en la educación', '2024-05-05', '16:00:00', 'Auditorio principal', 'Expertos discutirán cómo la gamificación puede mejorar la motivación y el compromiso de los estudiantes en el proceso de aprendizaje.', '/src/assets/images/psico1.jpg', 'Departamental', 'it0'),
('Taller de resolución de conflictos', '2024-04-18', '10:00:00', 'Aula 101', 'El taller proporcionará estrategias prácticas para resolver conflictos de manera constructiva en el ámbito escolar.', '/src/assets/images/psico1.jpg', 'Internacional', 'it0'),
('Charla sobre inteligencias múltiples', '2024-04-22', '15:00:00', 'Salón de actos', 'Expertos en educación explicarán la teoría de las inteligencias múltiples de Howard Gardner y su aplicación en el aula.', '/src/assets/images/psico2.jpg', 'Internacional', 'it0'),
('Sesión de mindfulness para docentes', '2024-04-25', '09:30:00', 'Sala de profesores', 'Los profesores aprenderán técnicas de mindfulness para reducir el estrés y mejorar su bienestar emocional.', '/src/assets/images/psico1.jpg', 'Internacional', 'it0'),
('Taller de creatividad en el aula', '2024-04-28', '14:00:00', 'Aula 203', 'Los participantes explorarán estrategias para fomentar la creatividad y la innovación en el proceso de enseñanza-aprendizaje.', '/src/assets/images/psico2.jpg', 'Internacional', 'it0'),
('Curso de inclusión educativa', '2024-05-02', '10:30:00', 'Sala de conferencias', 'El curso abordará prácticas inclusivas para atender a la diversidad de estudiantes en el aula.', '/src/assets/images/psico2.jpg', 'Internacional', 'it0'),
('Conferencia sobre gamificación en la educación', '2024-05-05', '16:00:00', 'Auditorio principal', 'Expertos discutirán cómo la gamificación puede mejorar la motivación y el compromiso de los estudiantes en el proceso de aprendizaje.', '/src/assets/images/psico1.jpg', 'Internacional', 'it0');

--para publicaciones
CREATE TABLE publicaciones (
    id_publicacion SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    autor VARCHAR(255) NOT NULL,
    descripcion TEXT,
	anio INT,
    publicacion_src VARCHAR(255),
	ruta TEXT
);
INSERT INTO publicaciones (titulo, autor, descripcion, anio, publicacion_src,ruta) 
VALUES 
    ('La importancia de la educación emocional', 'María González', 'En este artículo se explora la relevancia de la educación emocional en el desarrollo de los niños.', 2023, '/src/assets/images/publicacion.png','https://www.renfe.com/content/dam/renfe/es/General/PDF-y-otros/Ejemplo-de-descarga-pdf.pdf'),
    ('Estrategias para mejorar la concentración en el aula', 'Juan Pérez', 'Se presentan diversas técnicas y actividades para ayudar a los estudiantes a mantenerse concentrados durante las clases.', 2022, '/src/assets/images/publicacion.png','https://www.renfe.com/content/dam/renfe/es/General/PDF-y-otros/Ejemplo-de-descarga-pdf.pdf'),
    ('Cómo fomentar la lectura en los niños', 'Ana Martínez', 'Consejos y recomendaciones para promover el hábito de la lectura desde la infancia.', 2024, '/src/assets/images/publicacion.png','https://www.renfe.com/content/dam/renfe/es/General/PDF-y-otros/Ejemplo-de-descarga-pdf.pdf'),
    ('Beneficios del aprendizaje cooperativo', 'Carlos López', 'Se analizan los beneficios académicos y sociales del aprendizaje cooperativo en el aula.', 2021, '/src/assets/images/publicacion.png','https://www.turnerlibros.com/wp-content/uploads/2021/02/ejemplo.pdf'),
    ('Importancia de la inclusión en la educación', 'Laura Fernández', 'Reflexión sobre la importancia de crear entornos educativos inclusivos para todos los estudiantes.', 2023, '/src/assets/images/publicacion.png','https://www.turnerlibros.com/wp-content/uploads/2021/02/ejemplo.pdf'),
    ('Cómo abordar el bullying escolar', 'David García', 'Estrategias para prevenir y manejar situaciones de acoso escolar en las escuelas.', 2022, '/src/assets/images/publicacion.png','https://www.turnerlibros.com/wp-content/uploads/2021/02/ejemplo.pdf');
