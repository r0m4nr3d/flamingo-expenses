<template>
  <div class="container-fluid my-3 gestione-categorie">
    <h3 class="text-center mb-4">Gestione Categorie</h3>

    <!-- Form in alto -->
    <div class="card p-3 mb-4 shadow-sm">
      <form @submit.prevent="addCategoria">
        <div class="mb-3">
          <label class="form-label">Titolo Categoria:</label>
          <input type="text" v-model="categoriaForm.titoloCategoria" class="form-control" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Descrizione Categoria:</label>
          <input type="text" v-model="categoriaForm.descrizioneCategoria" class="form-control" required />
        </div>
        <button type="submit" class="btn btn-primary">
          <i class="fas fa-save me-1"></i> Aggiungi Categoria
        </button>
      </form>
    </div>

    <!-- Tabella (in basso) -->
    <div class="card shadow-sm">
      <div class="card-header">
        <h4 class="mb-0">Elenco Categorie</h4>
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
            <tr v-for="cat in categorie" :key="cat.id">
              <td>{{ cat.titoloCategoria }}</td>
              <td>{{ cat.descrizioneCategoria }}</td>
              <td>
                <button class="btn btn-danger btn-sm" @click="deleteCategoria(cat.id)">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </td>
            </tr>
            <tr v-if="categorie.length === 0">
              <td colspan="3" class="text-center">Nessuna categoria presente.</td>
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
  name: "CategorieView",
  data() {
    return {
      categorie: [],
      categoriaForm: {
        titoloCategoria: '',
        descrizioneCategoria: ''
      }
    }
  },
  mounted() {
    this.loadCategories()
  },
  methods: {
    loadCategories() {
      axios.get('/api/categorie/')
        .then(response => {
          this.categorie = response.data
        })
        .catch(error => {
          console.error("Errore nel caricare categorie:", error)
          alert("Errore nel caricare categorie.")
        })
    },
    addCategoria() {
      axios.post('/api/categorie/', this.categoriaForm)
        .then(response => {
          alert("Categoria aggiunta con successo!")
          this.loadCategories()
          // reset form
          this.categoriaForm = {
            titoloCategoria: '',
            descrizioneCategoria: ''
          }
        })
        .catch(error => {
          console.error("Errore salvataggio categoria:", error)
          alert("Errore salvataggio categoria.")
        })
    },
    deleteCategoria(idCategoria) {
      if (!confirm("Sei sicuro di voler eliminare questa categoria?")) return
      axios.delete(`/api/categorie/${idCategoria}/`)
        .then(() => {
          this.loadCategories()
        })
        .catch(error => {
          console.error("Errore eliminazione categoria:", error)
          alert("Errore eliminazione categoria.")
        })
    }
  }
}
</script>

<style scoped>
.gestione-categorie .card {
  margin-bottom: 1rem;
}
</style>
