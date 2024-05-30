<template>
    <div class="table-container">
      <table class="table">
        <thead>
          <tr>
            <th></th>
            <th v-for="(header, headerIndex) in headers" :key="headerIndex" :colspan="header.span">{{ header.text }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in cardRows" :key="rowIndex">
            <td class="semestre-cell">Semestre {{ rowIndex + 1 }}</td>
            <td v-for="(card, cardIndex) in row" :key="cardIndex" class="cell">
              <Card :title="card.title" :content="card.content" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import Card from './Card.vue';
  
  export default {
    components: {
      Card,
    },
    data() {
      return {
        cardRows: [],
        headers: [],
      };
    },
    created() {
      this.cardRows = this.generateCardRows();
      this.headers = [
        { text: 'ASIGNATURAS BÁSICAS'},
        { text: 'PSICOPEDAGOGÍA DE LA EDUCACIÓN FORMAL Y NO FORMAL' },
        { text: 'PSICOPEDAGOGÍA CLÍNICA'},
        { text: 'PSICOPEDAGOGÍA LABORAL' },
        { text: 'PSICOPEDAGOGÍA SOCIAL' },
        { text: 'FORMACIÓN GENÉRICA' },
        { text: 'LIBRES'},
      ] 
    },
    methods: {
        generateCardRows() {
  const rows = 9;
  const columns = 7; // Change the number of columns to 7
  const cardRows = [];

  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < columns; j++) {
      const header = this.headers[j] ? this.headers[j].text : ''; // Adjust the header retrieval
      const semester = i + 1;
      const cardId = `${header}-Semestre${semester}-Card${i * columns + j + 1}`;
      const title = `Semestre ${semester} - ${header}`; // Include semester and header in the title
      const content = `This is card number ${i * columns + j + 1} in Semester ${semester} under ${header}.`; // Include semester and header in the content
      row.push({ id: cardId, title: title, content: content });
    }
    cardRows.push(row);
  }
  return cardRows;
}



    },
  };
  </script>
  
  <style scoped>
  .table-container {
    width: 80%;
    margin: 0 auto;
  }
  
  .table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }
  
  .semestre-cell {
    background-color: #f5f5f5;
    font-weight: bold;
  }
  
  .cell {
    background-color: #f9f9f9;
  }
  
  .card-content {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  </style>
  