import { createRouter, createWebHistory } from 'vue-router'
import SpeseView from '../views/SpeseView.vue'
import PartecipantiView from '../views/PartecipantiView.vue'
import EventiView from '../views/EventiView.vue'
import CategorieView from '../views/CategorieView.vue'

const routes = [
  { path: '/', redirect: '/spese' },
  { path: '/spese', name: 'Spese', component: SpeseView },
  { path: '/partecipanti', name: 'Partecipanti', component: PartecipantiView },
  { path: '/eventi', name: 'Eventi', component: EventiView },
  { path: '/categorie', name: 'Categorie', component: CategorieView },
]

export default createRouter({
  history: createWebHistory(),
  routes
})
