<template>
  <div class="container-fluid my-3 gestione-partecipanti">
    <h3 class="text-center mb-4">Gestione Partecipanti</h3>

    <!-- Form in alto -->
    <div class="card p-3 mb-4 shadow-sm">
      <form @submit.prevent="addPartecipante">
        <div class="mb-3">
          <label class="form-label">Nome:</label>
          <input type="text" v-model="partecipanteForm.nome" class="form-control" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Cognome:</label>
          <input type="text" v-model="partecipanteForm.cognome" class="form-control" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Nickname:</label>
          <input type="text" v-model="partecipanteForm.nickname" class="form-control" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Email:</label>
          <input type="email" v-model="partecipanteForm.email" class="form-control" required />
        </div>
        <button type="submit" class="btn btn-primary">
          <i class="fas fa-save me-1"></i> Aggiungi Partecipante
        </button>
      </form>
    </div>

    <!-- Tabella in basso -->
    <div class="card shadow-sm">
      <div class="card-header">
        <h4 class="mb-0">Elenco Partecipanti</h4>
      </div>
      <div class="card-body p-0">
        <table class="table table-striped mb-0">
          <thead class="table-light">
            <tr>
              <th>Nome</th>
              <th>Cognome</th>
              <th>Nickname</th>
              <th>Email</th>
              <th>Azioni</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="part in partecipanti" :key="part.id">
              <td>{{ part.nome }}</td>
              <td>{{ part.cognome }}</td>
              <td>{{ part.nickname }}</td>
              <td>{{ part.email }}</td>
              <td>
                <button class="btn btn-danger btn-sm" @click="deletePartecipante(part.id)">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </td>
            </tr>
            <tr v-if="partecipanti.length === 0">
              <td colspan="5" class="text-center">Nessun partecipante presente.</td>
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
  name: "PartecipantiView",
  data() {
    return {
      partecipanti: [],
      partecipanteForm: {
        nome: '',
        cognome: '',
        nickname: '',
        email: ''
      }
    }
  },
  mounted() {
    this.loadParticipants()
  },
  methods: {
    loadParticipants() {
      axios.get('/api/partecipanti/')
        .then(response => {
          this.partecipanti = response.data
        })
        .catch(error => {
          console.error("Errore nel caricare partecipanti:", error)
          alert("Errore nel caricare partecipanti.")
        })
    },
    addPartecipante() {
      axios.post('/api/partecipanti/', this.partecipanteForm)
        .then(response => {
          alert("Partecipante aggiunto con successo!")
          this.loadParticipants()
          // reset
          this.partecipanteForm = {
            nome: '',
            cognome: '',
            nickname: '',
            email: ''
          }
        })
        .catch(error => {
          console.error("Errore nel salvataggio partecipante:", error)
          alert("Errore nel salvataggio partecipante.")
        })
    },
    deletePartecipante(id) {
      if (!confirm("Sei sicuro di voler eliminare questo partecipante?")) return
      axios.delete(`/api/partecipanti/${id}/`)
        .then(() => {
          this.loadParticipants()
        })
        .catch(error => {
          console.error("Errore eliminazione partecipante:", error)
          alert("Errore eliminazione partecipante.")
        })
    }
  }
}
</script>

<style scoped>
.gestione-partecipanti .card {
  margin-bottom: 1rem;
}
</style>
