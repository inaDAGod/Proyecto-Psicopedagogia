<template>
    <div class="cuerpo">
        <div class="formDatos">
            <h2 class="tituloE">Sociedad Científica Estudiantil INPSICOPEDIA</h2>
            <div class="mod">
                <div class="mod-content">
                    <h2>Informacion general</h2>
                    <form @submit.prevent="submitForm">
                    <div class="for-group">
                        <label for="comentario">¿Quienes somos?</label><br>
                        <textarea id="comentario" v-model="quienes_somos"></textarea>
                    </div>
                    <div class="for-group">
                        <label for="comentario">¿Desde cuando existimos?</label><br>
                        <textarea id="comentario" v-model="desdecuando"></textarea>
                    </div>
                    <div class="for-group">
                        <label for="comentario">¿Quienes forman parte?</label><br>
                        <textarea id="comentario" v-model="quienes_conforman"></textarea>
                    </div>
                    <div class="for-group">
                        <label for="comentario">¿Como unirse?</label><br>
                        <textarea id="comentario" v-model="como_unirse"></textarea>
                    </div>

                    <div style="text-align: center;">
                        <button class="bot-guardar">Guardar</button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
        <h2 class="tituloE">Investigaciones</h2>
        <div class="container">
            <div class="cardsInfo">
                
                <CardsInvestigaciones />
            </div>
            <div class="formAdd">
                <div class="formAdd">
                    <InvestigacionForm />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import CardsInvestigaciones from '/src/components/CardsSociedad.vue';
    import InvestigacionForm from '/src/components/SociedadForm.vue';
</script>
<style scoped>
    @import url('/src/assets/admins.css');
    @import url('/src/assets/formEgresados2.css');
</style>