<template>
  <div id="wrapper" class="d-flex flex-row">
    <!-- Sidebar -->
    <nav id="sidebar" class="bg-light p-3 shadow" :class="{ minimized: isMinimized }">
      <div class="toogle" :style="isMinimized ? 'padding-bottom: 20px !important;' : 'padding-bottom: 5px !important;'">
        <button class="btn btn-sm btn-link" @click="toggleSidebar" aria-label="Toggle sidebar">
          <i class="fas" :class="isMinimized ? 'fa-angle-double-right' : 'fa-angle-double-left'"></i>
        </button>
      </div>

      <div class="d-flex justify-content-between align-items-center mb-3"
        :style="isMinimized ? 'display: none !important;' : 'display: block;'">
        <h4 class="mb-0">Menu</h4>
      </div>

      <ul class="nav flex-column">
        <li class="nav-item mb-2">
          <router-link to="/spese" class="nav-link d-flex align-items-center">
            <i class="fas fa-money-bill-wave me-2"></i>
            <span v-if="!isMinimized">Gestione Spese</span>
          </router-link>
        </li>
        <li class="nav-item mb-2">
          <router-link to="/partecipanti" class="nav-link d-flex align-items-center">
            <i class="fas fa-users me-2"></i>
            <span v-if="!isMinimized">Gestione Partecipanti</span>
          </router-link>
        </li>
        <li class="nav-item mb-2">
          <router-link to="/eventi" class="nav-link d-flex align-items-center">
            <i class="fas fa-calendar-alt me-2"></i>
            <span v-if="!isMinimized">Gestione Eventi</span>
          </router-link>
        </li>
        <li class="nav-item mb-2">
          <router-link to="/categorie" class="nav-link d-flex align-items-center">
            <i class="fas fa-tags me-2"></i>
            <span v-if="!isMinimized">Gestione Categorie</span>
          </router-link>
        </li>
      </ul>
    </nav>

    <!-- Contenuto principale -->
    <main id="content" class="flex-fill p-3 overflow-auto">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: "MainLayout",
  data() {
    return {
      isMinimized: false
    };
  },
  methods: {
    toggleSidebar() {
      this.isMinimized = !this.isMinimized;
    }
  }
};
</script>

<style scoped>
/* Wrapper principale, esteso in orizzontale */
#wrapper {
  width: 100%;
  height: 100vh;
  /* oppure .vh-100 con bootstrap */
  display: flex;
  flex-flow: row nowrap;
}

/* Sidebar: larghezza fissa e transizione */
#sidebar {
  width: 300px;
  /* larghezza base */
  min-width: 300px;
  /* evita si restringa oltre */
  transition: width 0.3s ease;
}

/* Quando la sidebar è minimized */
#sidebar.minimized {
  width: 80px;
  min-width: 80px;
}

.toogle {
  text-align: right;
}

/* Link di navigazione */
.nav-link {
  color: #333;
  font-size: 1.1rem;
}

.nav-link:hover {
  color: #0d6efd;
  text-decoration: none;
}

#content {
  flex: 1 1 auto;
  min-width: 1000px;
  /* Questo si espande su tutto lo spazio rimanente */
}
</style>
