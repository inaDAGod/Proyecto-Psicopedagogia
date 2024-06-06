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
          <td class="semestre-cell" :rowspan="2" v-if="rowIndex % 2 === 0">Semestre {{ Math.floor(rowIndex / 2) + 1 }}</td>
          <td v-for="(card, cardIndex) in row" :key="cardIndex" :class="getCellClass(cardIndex)">
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
      areaMapping: {
        'ASIGNATURAS BÁSICAS': [0, 1],
        'PSICOPEDAGOGÍA DE LA EDUCACIÓN FORMAL Y NO FORMAL': [2, 3],
        'PSICOPEDAGOGÍA CLÍNICA': [4, 5],
        'PSICOPEDAGOGÍA LABORAL': [6, 7],
        'PSICOPEDAGOGÍA SOCIAL': [8, 9],
        'FORMACIÓN GENÉRICA': [10, 11],
        'LIBRES': [12, 13],
      },
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
      const rows = 18; // 9 semesters * 2 rows per semester
      const columns = 14;
      const cardRows = Array.from({ length: rows }, () => Array(columns).fill(null));

      data.forEach(item => {
        const semesterIndex = (item.semestre - 1) * 2;
        const areaColumns = this.areaMapping[item.area];

        if (areaColumns) {
          const [col1, col2] = areaColumns;
          const card = {
            title: item.materia,
            sigla: item.sigla,
            materia: item.materia,
            requisito: item.requisito,
            description: item.descrip,
          };

          // Fill the first row of the semester
          if (!cardRows[semesterIndex][col1]) {
            cardRows[semesterIndex][col1] = card;
          } else if (!cardRows[semesterIndex][col2]) {
            cardRows[semesterIndex][col2] = card;
          } else {
            // Fill the second row of the semester if the first row is full
            const secondRowIndex = semesterIndex + 1;
            if (!cardRows[secondRowIndex][col1]) {
              cardRows[secondRowIndex][col1] = card;
            } else {
              cardRows[secondRowIndex][col2] = card;
            }
          }
        }
      });

      this.cardRows = cardRows;
    },
    getCellClass(index) {
      const areaClasses = {
        0: 'basic-subjects',
        1: 'basic-subjects',
        2: 'educ-formal',
        3: 'educ-formal',
        4: 'clinic-psychopedagogy',
        5: 'clinic-psychopedagogy',
        6: 'labor-psychopedagogy',
        7: 'labor-psychopedagogy',
        8: 'social-psychopedagogy',
        9: 'social-psychopedagogy',
        10: 'generic-formation',
        11: 'generic-formation',
        12: 'free',
        13: 'free',
      };
      return areaClasses[index] || '';
    },
  },
};
</script>

<style scoped>
.table-container {
  width: 100%;
  overflow-x: auto;
  margin: 1% auto;
}

.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 1em;
}

th,
td {
  padding: 8px;
  text-align: center;
  font-size: 0.8em;
  width: auto;
}

thead th {
  background-color: rgba(13, 137, 244, 1);
  color: white;
  font-weight: bold;
  font-size: 0.7em;
}

.semestre-cell {
  background-color: rgba(170, 214, 251, 1);
  color: black;
  font-weight: bold;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  font-size: 0.9em;
}

.cell {
  background-color: #f9f9f9;
}

/* Column area styles */
.basic-subjects {
  background-color: #e3f5a4;
}

.educ-formal {
  background-color:#ddedfb;
}

.clinic-psychopedagogy {
  background-color:  #fefab9;
}

.labor-psychopedagogy {
  background-color: #fdd4b5;
}

.social-psychopedagogy {
  background-color: #ddd5f1;
}

.generic-formation {
  background-color: #e3f5a4;
}

.free {
  background-color: #ddedfb;
}

.card-content {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 768px) {
  th,
  td {
    padding: 6px;
    font-size: 0.7em;
  }

  .semestre-cell {
    font-size: 0.8em;
  }
}
</style>
