<template>
  <div v-if="history.length" class="history">
    <ul class="history-list">
      <li v-for="(entry, index) in history" :key="index" class="history-item">
        {{ entry }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CalcHistory',
  props: {
    history: Array,
    showHistory: Boolean,
  },
};
</script>

<style scoped>
/* Container de l'historique avec une hauteur maximale et un défilement vertical */
.history {
  display: block;
  width: 100%;
  max-width: 450px; /* Largeur maximale de l'historique */
  max-height: 80px; /* Limite de la hauteur */
  overflow-y: auto; /* Activation du défilement */
  padding-right: 10px; /* Ajoute de l'espace à droite pour éviter que la scrollbar touche le bord */
  background-color: rgba(0, 0, 0, 0.2); /* Fond léger */
  border-radius: 8px; /* Coins arrondis pour une meilleure esthétique */
  margin-bottom: 10px;
}

.history-list {
  list-style-type: none; /* Retire les puces */
  padding: 0; /* Pas de padding */
  margin: 0; /* Pas de marge */
}

.history-item {
  text-align: center; /* Texte centré */
  margin: 5px 0; /* Espacement vertical entre les éléments */
  color: white; /* Texte en blanc */
  font-size: 0.9em; /* Taille de police plus petite pour l'historique */
}

/* Personnalisation de la barre de défilement */
.history::-webkit-scrollbar {
  width: 8px; /* Largeur de la barre de défilement */
}

.history::-webkit-scrollbar-thumb {
  background-color: rgba(
    255,
    255,
    255,
    0.6
  ); /* Couleur de la barre de défilement */
  border-radius: 10px; /* Coins arrondis */
}

.history::-webkit-scrollbar-thumb:hover {
  background-color: rgba(255, 255, 255, 0.9); /* Couleur au survol */
}

.history::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.2); /* Fond de la barre de défilement */
  border-radius: 10px; /* Coins arrondis */
}

/* Mise en page responsive pour les petits écrans */
@media (max-width: 400px) {
  .history {
    width: 100%; /* Largeur à 100% pour les petits écrans */
    max-width: 320px; /* Largeur maximale plus petite */
  }
}
</style>
