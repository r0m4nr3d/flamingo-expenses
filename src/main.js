// main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

// ESEMPIO di mock 
const mock = new MockAdapter(axios, { delayResponse: 300 })

// Dati di prova in memoria
let speseMock = [
    { id: 1, idEvento: 3, idCategoria: 4, idPartecipante: 1, importo: 20, dataSpesa: "2024-12-22", note: "prova" },
    { id: 2, idEvento: 1, idCategoria: 2, idPartecipante: 1, importo: 3454, dataSpesa: "2024-12-30", note: "asdasdasd" }
]
let eventiMock = [
    { id: 1, titoloEvento: "Compleanno" },
    { id: 2, titoloEvento: "Concerto Rock" },
    { id: 3, titoloEvento: "Festa di fine anno" }
]
let categorieMock = [
    { id: 1, titoloCategoria: "Alimentari" },
    { id: 2, titoloCategoria: "Trasporti" },
    { id: 4, titoloCategoria: "Varie" }
]
let partecipantiMock = [
    { id: 1, nome: "Mario", cognome: "Rossi" },
    { id: 2, nome: "Luca", cognome: "Verdi" },
]

// GET /api/spese/
mock.onGet('/api/spese/').reply(200, speseMock)

// POST /api/spese/
mock.onPost('/api/spese/').reply((config) => {
    const newSpesa = JSON.parse(config.data)
    // generiamo ID
    const newId = speseMock.length ? Math.max(...speseMock.map(s => s.id)) + 1 : 1
    newSpesa.id = newId
    speseMock.push(newSpesa)
    return [200, newSpesa]
})

// DELETE /api/spese/:id
mock.onDelete(/\/api\/spese\/\d+/).reply((config) => {
    const idStr = config.url.match(/\/api\/spese\/(\d+)/)[1]
    const id = parseInt(idStr)
    speseMock = speseMock.filter(s => s.id !== id)
    return [200, { success: true }]
})

// Eventi
mock.onGet('/api/eventi/').reply(200, eventiMock)

// Categorie
mock.onGet('/api/categorie/').reply(200, categorieMock)

// Partecipanti
mock.onGet('/api/partecipanti/').reply(200, partecipantiMock)

// ... e così via per le altre operazioni

import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

// Avvio app
const app = createApp(App)
app.use(router)
app.mount('#app')
