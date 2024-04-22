<template>
    <div>
      <button @click="showForm">Agregar Docente</button>
      
      <!-- Modal -->
      <div v-if="isFormVisible" class="modal">
        <div class="modal-content">
          <span class="close" @click="hideForm">&times;</span>
          <h2>Agregar Docente</h2>
          <form @submit.prevent="addDocente">
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" v-model="nombre" required>
  
            <label for="apodo">Apodo:</label>
            <input type="text" id="apodo" v-model="apodo" required>
  
            <label for="cargo">Cargo:</label>
            <input type="text" id="cargo" v-model="cargo" required>
  
            <label for="correo">Correo:</label>
            <input type="email" id="correo" v-model="correo" required>
  
            <label for="datoc">Datoc:</label>
            <input type="text" id="datoc" v-model="datoc" required>
  
            <label for="imagen">Imagen:</label>
            <input type="text" id="imagen" v-model="imagen">
  
            <button type="submit">Agregar</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isFormVisible: false,
        nombre: '',
        apodo: '',
        cargo: '',
        correo: '',
        datoc: '',
        imagen: ''
      };
    },
    methods: {
      showForm() {
        this.isFormVisible = true;
      },
      hideForm() {
        this.isFormVisible = false;
      },
      async addDocente() {
        try {
          const response = await fetch('http://localhost:3000/api/docentes', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              nombre: this.nombre,
              apodo: this.apodo,
              cargo: this.cargo,
              correo: this.correo,
              datoc: this.datoc,
              imagen: this.imagen
            })
          });
  
          if (response.ok) {
            alert('¡Docente agregado correctamente!');
            this.hideForm();
            // Optionally, you can emit an event to notify parent components that a docente has been added
          } else {
            const data = await response.json();
            throw new Error(data.error || 'Error al agregar el docente');
          }
        } catch (error) {
          console.error('Error al agregar el docente:', error);
          alert('Ocurrió un error al agregar el docente. Por favor, inténtalo de nuevo.');
        }
      }
    }
  };
  </script>
  
  <style>
  /* Estilos del modal */
  .modal {
    display: none;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
  }
  
  .modal-content {
    background-color: #fefefe;
    margin: 10% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
  }
  
  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }
  
  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
  </style>
  
  
  <style>
  /* Modal styles */
  .modal {
    display: none;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.4);
  }
  
  .modal-content {
    background-color: #fefefe;
    margin: 10% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
  }
  
  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }
  
  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
  </style>
  
  
  <style>
  /* Modal styles */
  .modal {
    display: none;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.4);
  }
  
  .modal-content {
    background-color: #fefefe;
    margin: 10% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
  }
  
  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }
  
  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
  /* Modal styles */
.modal {
  display: block; /* Ensure the modal is initially displayed */
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 10% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}






  </style>
  