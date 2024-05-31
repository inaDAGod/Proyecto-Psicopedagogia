const actividadesU = ref([]);
  const actividadURows = ref([]);
  const expandedInfoActividadU = ref([]);
  
  const obtenerActividades_Universidad = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/actividades_universidad');
      actividadesU.value = response.data;
      calcularFilasDeActividadesU();
    } catch (error) {
      console.error('Error fetching Actividades:', error);
    }
  };
  
  const calcularFilasDeActividadesU = () => {
    actividadURows.value = [];
    expandedInfoActividadU.value = [];
    for (let i = 0; i < actividadesU.value.length; i += 3) {
      const row = [];
      const infoRow = [];
      for (let j = i; j < i + 3 && j < actividadesU.value.length; j++) {
        row.push(actividadesU.value[j]);
        infoRow.push(false); // Inicialmente la información está oculta
      }
      actividadURows.value.push(row);
      expandedInfoActividadU.value.push(infoRow);
    }
  };
  
  const toggleInfoActividadU = (rowIndex, index) => {
    expandedInfoActividadU.value[rowIndex][index] = !expandedInfoActividadU.value[rowIndex][index];
  };
  
  onMounted(() => {
    obtenerActividades_Universidad();
  });

  
  const actividadesD = ref([]);
  const actividadDRows = ref([]);
  const expandedInfoActividadD = ref([]);
  
  const obtenerActividades_Departamental = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/actividades_departamental');
      actividadesD.value = response.data;
      calcularFilasDeActividadesD();
    } catch (error) {
      console.error('Error fetching Actividades:', error);
    }
  };
  
  const calcularFilasDeActividadesD = () => {
    actividadDRows.value = [];
    expandedInfoActividadD.value = [];
    for (let i = 0; i < actividadesD.value.length; i += 3) {
      const row = [];
      const infoRow = [];
      for (let j = i; j < i + 3 && j < actividadesD.value.length; j++) {
        row.push(actividadesD.value[j]);
        infoRow.push(false); // Inicialmente la información está oculta
      }
      actividadDRows.value.push(row);
      expandedInfoActividadD.value.push(infoRow);
    }
  };
  
  const toggleInfoActividadD = (rowIndex, index) => {
    expandedInfoActividadD.value[rowIndex][index] = !expandedInfoActividadD.value[rowIndex][index];
  };
  
  onMounted(() => {
    obtenerActividades_Departamental();
  });

  const actividadesI = ref([]);
  const actividadIRows = ref([]);
  const expandedInfoActividadI = ref([]);
  
  const obtenerActividades_Internacional = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/actividades_internacional');
      actividadesI.value = response.data;
      calcularFilasDeActividadesI();
    } catch (error) {
      console.error('Error fetching Actividades:', error);
    }
  };
  
  const calcularFilasDeActividadesI = () => {
    actividadIRows.value = [];
    expandedInfoActividadI.value = [];
    for (let i = 0; i < actividadesI.value.length; i += 3) {
      const row = [];
      const infoRow = [];
      for (let j = i; j < i + 3 && j < actividadesI.value.length; j++) {
        row.push(actividadesI.value[j]);
        infoRow.push(false); // Inicialmente la información está oculta
      }
      actividadIRows.value.push(row);
      expandedInfoActividadI.value.push(infoRow);
    }
  };
  
  const toggleInfoActividadI = (rowIndex, index) => {
    expandedInfoActividadI.value[rowIndex][index] = !expandedInfoActividadI.value[rowIndex][index];
  };
  
  onMounted(() => {
    obtenerActividades_Internacional();
  });