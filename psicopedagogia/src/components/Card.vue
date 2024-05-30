<!-- src/components/Card.vue -->
<template>
    <div class="card">
      <h3>{{ title }}</h3>
      <p>{{ content }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      title: String,
      content: String,
    },
  };
  </script>
  
  <style scoped>
  .card {
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 1rem;
    margin: 0.5rem;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: 768px) {
    .card {
      padding: 0.75rem;
      margin: 0.5rem 0;
    }
  }
  
  @media (max-width: 480px) {
    .card {
      padding: 0.5rem;
      margin: 0.25rem 0;
    }
  }
  </style>
  