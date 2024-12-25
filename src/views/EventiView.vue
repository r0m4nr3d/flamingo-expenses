<template>
  <div class="container-fluid my-3 gestione-eventi">
    <h3 class="text-center mb-4">Gestione Eventi</h3>

    <!-- Form in alto -->
    <div class="card p-3 mb-4 shadow-sm">
      <form @submit.prevent="addEvento">
        <div class="mb-3">
          <label class="form-label">Titolo Evento:</label>
          <input type="text" v-model="eventoForm.titoloEvento" class="form-control" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Descrizione Evento:</label>
          <input type="text" v-model="eventoForm.descrizioneEvento" class="form-control" required />
        </div>
        <button type="submit" class="btn btn-primary">
          <i class="fas fa-save me-1"></i> Aggiungi Evento
        </button>
      </form>
    </div>

    <!-- Tabella (in basso) -->
    <div class="card shadow-sm">
      <div class="card-header">
        <h4 class="mb-0">Elenco Eventi</h4>
      </div>
      <div class="card-body p-0">
        <table class="table table-striped mb-0">
          <thead class="table-light">
            <tr>
              <th>Titolo</th>
              <th>Descrizione</th>
              <th>Azioni</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ev in eventi" :key="ev.id">
              <td>{{ ev.titoloEvento }}</td>
              <td>{{ ev.descrizioneEvento }}</td>
              <td>
                <button class="btn btn-danger btn-sm" @click="deleteEvento(ev.id)">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </td>
            </tr>
            <tr v-if="eventi.length === 0">
              <td colspan="3" class="text-center">Nessun evento presente.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "EventiView",
  data() {
    return {
      eventi: [],
      eventoForm: {
        titoloEvento: '',
        descrizioneEvento: ''
      }
    }
  },
  mounted() {
    this.loadEvents()
  },
  methods: {
    loadEvents() {
      axios.get('/api/eventi/')
        .then(response => {
          this.eventi = response.data
        })
        .catch(error => {
          console.error("Errore nel caricare eventi:", error)
          alert("Errore nel caricare eventi.")
        })
    },
    addEvento() {
      axios.post('/api/eventi/', this.eventoForm)
        .then(response => {
          alert("Evento aggiunto con successo!")
          this.loadEvents()
          // reset form
          this.eventoForm = {
            titoloEvento: '',
            descrizioneEvento: ''
          }
        })
        .catch(error => {
          console.error("Errore salvataggio evento:", error)
          alert("Errore salvataggio evento.")
        })
    },
    deleteEvento(idEvento) {
      if (!confirm("Sei sicuro di voler eliminare questo evento?")) return
      axios.delete(`/api/eventi/${idEvento}/`)
        .then(() => {
          this.loadEvents()
        })
        .catch(error => {
          console.error("Errore eliminazione evento:", error)
          alert("Errore eliminazione evento.")
        })
    }
  }
}
</script>

<style scoped>
.gestione-eventi .card {
  margin-bottom: 1rem;
}
</style>
