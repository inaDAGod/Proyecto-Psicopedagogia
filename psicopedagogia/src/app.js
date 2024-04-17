const app = Vue.createApp({
    data() {
        return {
            docentes: [
                {
                    id: 1,
                    nombre: 'John Doe',
                    apodo:'johnny',
                    imagen: 'https://ucblpz.com/wp-content/uploads/2019/04/Alejandra-Martinez-1.jpg',
                    cargo: 'Profesor',
                    correo: 'john.doe@example.com',
                    datoc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
                },
                {
                    id: 2,
                    nombre: 'Jane Smith',
                    apodo:'janey',
                    imagen: 'https://ucblpz.com/wp-content/uploads/2019/02/Karina-Garci%CC%81a.jpg',
                    cargo: 'Docente Asociado',
                    correo: 'jane.smith@example.com',
                    datoc: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                },
                // Add more docentes as needed
            ],
            youtubeintro: 'https://www.youtube.com/embed/tgbNymZ7vqY',
            Sociedad: 'https://www.facebook.com/Inpsicopedia',
            Semillas: '',
            Psico: 'https://lpz.ucb.edu.bo/pregrado/psicopedagogia',
            faceinfo: 'https://www.facebook.com/PSPLaPaz%20',
            inst: 'https://www.instagram.com/ucb.psp/',
            canalyt: 'https://www.youtube.com/@UCBLaPazBo',
            tiktok: 'https://www.tiktok.com/@psicopedagogialapazucb',
            textodire: `Departamento de Psicopedagogía: Av. 14 de Septiembre y Calle 2 de Obrajes -
            Bloque N - Jardín posterior
            
            Horarios de atención: de lunes a viernes de 08:30 a 16:30
            
            Contacto: 2782222 Int. 2872
            
            WhatsApp: 73231313 - 77294940`
        };
    },
    methods: {
        generateTable(docente) {
            const tableHTML = `<center>
            <div class="docentes">
            <div class="docentes-info">
            <p >Nombre: ${docente.nombre}<br><br>
            Cargo: ${docente.cargo}<br><br>
            Correo: ${docente.correo}<br><br>
            Descripción: ${docente.datoc}</p>
        </div>
        <div class="docentes-avatar">
            <div class="docentes-nickname">${docente.apodo}</div>
            <img src="${docente.imagen}" alt="${docente.nombre}" class="docentes-image">
        </div>
                </div><center>
            
        `;

            return tableHTML;
        }
    }
});

app.mount('#app');
