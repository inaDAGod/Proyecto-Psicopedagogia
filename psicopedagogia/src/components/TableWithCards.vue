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
            <Card v-if="card" 
                  :title="card.title" 
                  :sigla="card.sigla"
                  :materia="card.materia"
                  :requisito="card.requisito"
                  :description="card.description" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
import Card from './Card.vue';

export default {
  components: {
    Card,
  },
  data() {
    return {
      cardRows: [],
      headers: [
        { text: 'ASIGNATURAS BÁSICAS', span: 2 },
        { text: 'PSICOPEDAGOGÍA DE LA EDUCACIÓN FORMAL Y NO FORMAL', span: 2 },
        { text: 'PSICOPEDAGOGÍA CLÍNICA', span: 2 },
        { text: 'PSICOPEDAGOGÍA LABORAL', span: 2 },
        { text: 'PSICOPEDAGOGÍA SOCIAL', span: 2 },
        { text: 'FORMACIÓN GENÉRICA', span: 2 },
        { text: 'LIBRES', span: 2 },
      ],
    };
  },
  created() {
    this.fetchSemestreData();
  },
  methods: {
    async fetchSemestreData() {
      try {
        const response = await axios.get('http://localhost:3000/api/semestre');
        this.organizeCards(response.data);
      } catch (error) {
        console.error('Error fetching semestre data:', error);
      }
    },
    organizeCards(data) {
      const rows = 9;
      const columns = 14;
      const cardRows = Array.from({ length: rows }, () => Array(columns).fill(null));
      const areaMapping = {
        'ASIGNATURAS BÁSICAS': [0, 1],
        'PSICOPEDAGOGÍA DE LA EDUCACIÓN FORMAL Y NO FORMAL': [2, 3],
        'PSICOPEDAGOGÍA CLÍNICA': [4, 5],
        'PSICOPEDAGOGÍA LABORAL': [6, 7],
        'PSICOPEDAGOGÍA SOCIAL': [8, 9],
        'FORMACIÓN GENÉRICA': [10, 11],
        'LIBRES': [12, 13],
      };

      data.forEach(item => {
        const semester = item.semestre - 1;
        const areaColumns = areaMapping[item.area];

        if (areaColumns) {
          const [col1, col2] = areaColumns;
          const card = {
            title: item.materia,
            sigla: item.sigla,
            materia: item.materia,
            requisito: item.requisito,
            description: item.descrip,
          };

          if (!cardRows[semester][col1]) {
            cardRows[semester][col1] = card;
          } else {
            cardRows[semester][col2] = card;
          }
        }
      });

      this.cardRows = cardRows;
    },
  },
};
</script>

<style scoped>
.table-container {
  width: 70%;
  
  margin: 1%;
}

.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 100%;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
  font-size: 50%;
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
