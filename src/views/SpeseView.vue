<template>
  <div class="container-fluid my-3">
    <h3 class="text-center mb-4">Gestione Spese</h3>

    <!-- Form base spesa (in alto) -->
    <div class="card p-3 mb-4 shadow-sm">
      <form @submit.prevent="addSpesa">
        <div class="mb-3">
          <label class="form-label">Evento:</label>
          <multiselect v-model="spesaForm.idEvento" :options="eventi" label="titoloEvento" track-by="id"
            :searchable="true" placeholder="Seleziona un evento..." class="multiselect" />
        </div>

        <div class="mb-3">
          <label class="form-label">Categoria:</label>
          <multiselect v-model="spesaForm.idCategoria" :options="categorie" label="titoloCategoria" track-by="id"
            :searchable="true" placeholder="Seleziona una categoria..." class="multiselect" />
        </div>

        <div class="mb-3">
          <label class="form-label">Sostenitore spesa:</label>
          <multiselect v-model="spesaForm.idPartecipante" :options="partecipanti" label="nomeCompleto" track-by="id"
            :searchable="true" placeholder="Seleziona un partecipante..." class="multiselect" />
        </div>

        <div class="mb-3">
          <label class="form-label">Importo:</label>
          <input type="number" step="0.01" class="form-control" v-model="spesaForm.importo" required />
        </div>

        <div class="mb-3">
          <label class="form-label">Data Spesa:</label>
          <input type="date" class="form-control" v-model="spesaForm.dataSpesa" required />
        </div>

        <div class="mb-3">
          <label class="form-label">Note:</label>
          <input type="text" class="form-control" v-model="spesaForm.note" />
        </div>

        <button type="submit" class="btn btn-primary">
          <i class="fas fa-save me-1"></i> Salva Spesa
        </button>
      </form>
    </div>

    <!-- Elenco Spese (in basso) -->
    <div class="card shadow-sm">
      <div class="card-header">
        <h4 class="mb-0">Elenco Spese</h4>
      </div>
      <div class="card-body p-0">
        <table class="table table-striped mb-0">
          <thead class="table-light">
            <tr>
              <th>ID Spesa</th>
              <th>ID Evento</th>
              <th>ID Categoria</th>
              <th>ID Partecipante</th>
              <th>Importo</th>
              <th>Data</th>
              <th>Note</th>
              <th>Azioni</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="sp in spese" :key="sp.id">
              <td>{{ sp.id }}</td>
              <td>{{ sp.idEvento }}</td>
              <td>{{ sp.idCategoria }}</td>
              <td>{{ sp.idPartecipante }}</td>
              <td>{{ sp.importo }}</td>
              <td>{{ sp.dataSpesa }}</td>
              <td>{{ sp.note }}</td>
              <td>
                <button class="btn btn-danger btn-sm" @click="deleteSpesa(sp.id)">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </td>
            </tr>
            <tr v-if="spese.length === 0">
              <td colspan="8" class="text-center">Nessuna spesa presente.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'

export default {
  name: 'SpeseView',
  components: {
    Multiselect
  },
  data() {
    return {
      spese: [],
      eventi: [],
      categorie: [],
      partecipanti: [],
      spesaForm: {
        idEvento: '',
        idCategoria: '',
        idPartecipante: '',
        importo: '',
        dataSpesa: '',
        note: ''
      }
    }
  },
  mounted() {
    this.loadSpese()
    this.loadComboData()
  },
  methods: {
    loadSpese() {
      axios.get('/api/spese/')
        .then(response => {
          this.spese = response.data
        })
        .catch(error => {
          console.error("Errore nel caricare spese:", error)
          alert("Errore nel caricare spese.")
        })
    },
    loadComboData() {
      axios.get('/api/eventi/')
        .then(r => {
          this.eventi = r.data
        })
        .catch(err => console.error("Errore eventi", err))

      axios.get('/api/categorie/')
        .then(r => {
          this.categorie = r.data
        })
        .catch(err => console.error("Errore categorie", err))

      axios.get('/api/partecipanti/')
        .then(r => {
          this.partecipanti = r.data.map(p => ({
            ...p,
            // creo un campo "nomeCompleto"
            nomeCompleto: p.nome + ' ' + p.cognome
          }))
        })
        .catch(err => console.error("Errore partecipanti", err))
    },
    addSpesa() {
      axios.post('/api/spese/', this.spesaForm)
        .then(response => {
          alert("Spesa salvata con ID: " + response.data.id)
          this.loadSpese()
          // reset
          this.spesaForm = {
            idEvento: '',
            idCategoria: '',
            idPartecipante: '',
            importo: '',
            dataSpesa: '',
            note: ''
          }
        })
        .catch(error => {
          console.error("Errore salvataggio spesa:", error)
          alert("Errore salvataggio spesa.")
        })
    },
    deleteSpesa(idSpesa) {
      if (!confirm("Sei sicuro di voler eliminare questa spesa?")) return
      axios.delete(`/api/spese/${idSpesa}/`)
        .then(() => {
          this.loadSpese()
        })
        .catch(error => {
          console.error("Errore eliminazione spesa:", error)
          alert("Errore eliminazione spesa.")
        })
    }
  }
}
</script>

<style scoped>
.multiselect {
  min-width: 220px;
  display: block;
}
</style>
