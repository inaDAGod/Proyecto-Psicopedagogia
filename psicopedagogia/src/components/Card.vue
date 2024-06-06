<template>
  <div>
    <div class="card" @click="showDescription">
      <h3>{{ title }}</h3>
      <p>{{ sigla }}</p>
      <p>▪ Req: {{ requisito }}</p>
    </div>

    <!-- Modal -->
    <transition name="modal">
      <div v-if="isModalVisible" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
          <span class="close" @click="closeModal">&times;</span>
          <h3>{{ title }}</h3>
          <p>{{ sigla }}</p>
          <br>
          <p>{{ description }}</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    sigla: String,
    materia: String,
    requisito: String,
    description: String,
  },
  data() {
    return {
      isModalVisible: false,
    };
  },
  methods: {
    showDescription() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
  },
};
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 5px;
  cursor: pointer;
  text-align: center;
  font-size: 0.8em;
}

.card h3 {
  font-size: 1.2em;
}

.card p {
  font-size: 1em;
}

.modal-overlay {
  display: flex;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  position: relative;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
}

.close {
  color: #aaa;
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 1.5em;
  font-weight: bold;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: black;
}

/* Add transition effects */
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.3s ease;
}
.modal-enter, .modal-leave-to /* .modal-leave-active in <2.1.8 */ {
  opacity: 0;
}

@media (max-width: 768px) {
  .card {
    font-size: 0.7em;
  }

  .card h3 {
    font-size: 1em;
  }

  .card p {
    font-size: 0.9em;
  }

  .modal-content {
    font-size: 0.9em;
  }
}
</style>
