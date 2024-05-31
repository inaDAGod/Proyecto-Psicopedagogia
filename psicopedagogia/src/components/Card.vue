<template>
  <div>
    <div class="card" @click="showDescription">
      <h3 style="font-size: 140%;">{{ title }}</h3>
      <p style="text-align: center;font-size: 100%;">{{ sigla }}</p>
      <p style="text-align: center;font-size: 100%;">▪ Req: {{ requisito }}</p>
    </div>

    <!-- Modal -->
    <transition name="modal">
      <div v-if="isModalVisible" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
          <span class="close" @click="closeModal">&times;</span>
          <h3>{{ title }}</h3>
          <p style="text-align: center;font-size: 200%;">{{ sigla }}</p>
          <br>
          <p style="font-size: 280%;">{{ description }}</p>
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
  width: 100%;
  cursor: pointer;
  
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
  width: 80%;
  max-width: 600px;
  position: relative;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
}

.close {
  color: #aaa;
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 28px;
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
</style>
