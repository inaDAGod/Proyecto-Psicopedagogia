CREATE TABLE home (
    id SERIAL PRIMARY KEY,
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
INSERT INTO home (imagen1, imagen2, imagen3, imagen4, imagen5, imagen6, quienes_somos, mision, mision_src, vision, vision_src, perfil_estudiante, perfil_estudiante_src)
VALUES (
    './assets/images/psicopedagogía.jpg',
    './assets/images/psicopedagogía2.jpg',
    './assets/images/psicopedagogía3.jpg',
    './assets/images/psicopedagogía4.jpg',
    './assets/images/psicopedagogía2.jpg',
    './assets/images/psicopedagogía3.jpg',
    'QUIENES SOMOS educación inicial, primaria, secundaria, universitaria, técnica tecnológica que desarrollan procesos formativos en instituciones públicas, privadas y de convenio. En proyectos y programas educativos que mejoran la calidad de vida de diferentes poblaciones desde ministerios, municipios, fundaciones y ONG´s. En empresas públicas y privadas que desarrollan gestión del conocimiento desde sus departamentos de Recursos Humanos y sus unidades de capacitación. Desarrollando su propio emprendimiento Centros psicopedagógicos y Centros de Educación integral que trabajan con niñez, adolescencia, juventud y adultos que presenten.',
    'MISION----- educación inicial, primaria, secundaria, universitaria, técnica tecnológica que desarrollan procesos formativos en instituciones públicas, privadas y de convenio. En proyectos y programas educativos que mejoran la calidad de vida de diferentes poblaciones desde ministerios, municipios, fundaciones y ONG´s. En empresas públicas y privadas que desarrollan gestión del conocimiento desde sus departamentos de Recursos Humanos y sus unidades de capacitación. Desarrollando su propio emprendimiento Centros p',
    './assets/images/psicopedagogía.jpg',
    'VISION----- educación inicial, primaria, secundaria, universitaria, técnica tecnológica que desarrollan procesos formativos en instituciones públicas, privadas y de convenio. En proyectos y programas educativos que mejoran la calidad de vida de diferentes poblaciones desde ministerios, municipios, fundaciones y ONG´s. En empresas públicas y privadas que desarrollan gestión del conocimiento desde sus departamentos de Recursos Humanos y sus unidades de capacitación. Desarrollando su propio emprendimiento Centros p',
    './assets/images/psicopedagogía.jpg',
    'PERFIL ESTUDIANTE----- educación inicial, primaria, secundaria, universitaria, técnica tecnológica que desarrollan procesos formativos en instituciones públicas, privadas y de convenio. En proyectos y programas educativos que mejoran la calidad de vida de diferentes poblaciones desde ministerios, municipios, fundaciones y ONG´s. En empresas públicas y privadas que desarrollan gestión del conocimiento desde sus departamentos de Recursos Humanos y sus unidades de capacitación. Desarrollando su propio emprendimiento Centros p',
    './assets/images/psicopedagogía.jpg'
);

select *from home
delete from home
