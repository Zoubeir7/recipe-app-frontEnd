<template>
  <div class="container mt-5">
    <h1 class="mb-4 text-center fw-bold text-warning">Liste des Recettes</h1>

    <div class="text-end mb-4">
      <button class="btn btn-warning fw-bold" @click="goToAddRecipePage">
        <i class="fas fa-plus"></i> Ajouter une recette
      </button>
    </div>

    <div v-if="recipeStore.recettes.length === 0" class="text-center">
      <p>Aucune recette trouvée.</p>
    </div>

    <table v-else class="table table-striped table-bordered">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Titre</th>
          <th scope="col">Type</th>
          <th scope="col">Ingrédients</th>
          <th scope="col">Catégorie</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(recette, index) in recipeStore.recettes" :key="recette.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ recette.title }}</td>
          <td>{{ recette.type }}</td>

          <td>
            <ul v-if="Array.isArray(recette.ingredients)">
              <li v-for="ingredient in recette.ingredients" :key="ingredient">{{ ingredient }}</li>
            </ul>
            <span v-else>{{ recette.ingredients }}</span>
          </td>

          <td>{{ getCategoryTitle(recette.category_id) }}</td>

          <td class="text-center">
            <button class="btn btn-sm btn-outline-primary me-2" @click="goToEditRecipePage(recette.id)">
              <i class="fas fa-edit"></i>
            </button>
            <button class="btn btn-sm btn-outline-danger me-2" @click="openConfirmationModal(recette.id)">
              <i class="fas fa-trash"></i>
            </button>
            <button class="btn btn-sm btn-outline-info" @click="goToPreviewRecipePage(recette.id)">
              <i class="fas fa-eye"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modale de confirmation -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirmation</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <p>Êtes-vous sûr de vouloir supprimer cette recette ?</p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" @click="closeModal">Annuler</button>
            <button class="btn btn-danger" @click="confirmDeleteRecipe">Supprimer</button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRecipeStore } from "@store/recipeStore";
import { useCategoryStore } from "@store/categoryStore";
import { useRouter } from "vue-router";

const recipeStore = useRecipeStore();
const categoryStore = useCategoryStore();
const router = useRouter();

const showModal = ref(false); // Gère l'affichage de la modale
const selectedRecipeId = ref(null); // Stocke l'ID de la recette à supprimer

onMounted(() => {
  recipeStore.loadDataFromApi();
  categoryStore.loadCategoriesFromAPI();
});

const getCategoryTitle = (categoryId) => {
  const category = categoryStore.categories.find((c) => c.id === categoryId);
  return category ? category.name : "Non définie";
};

const goToAddRecipePage = () => {
  router.push({ name: "recette-add" });
};

const goToEditRecipePage = (recipeId) => {
  router.push({ name: "recette-edit", params: { id: recipeId } });
};

const goToPreviewRecipePage = (recipeId) => {
  router.push({ name: "recette-show", params: { id: recipeId } });
};

const openConfirmationModal = (recipeId) => {
  selectedRecipeId.value = recipeId;
  showModal.value = true; // Ouvre la modale de confirmation
};

const confirmDeleteRecipe = async () => {
  if (selectedRecipeId.value) {
    await recipeStore.deleteRecipeFromAPI(selectedRecipeId.value);
    showModal.value = false; // Ferme la modale après suppression
    selectedRecipeId.value = null;
  }
};

const closeModal = () => {
  showModal.value = false; // Ferme la modale sans supprimer
  selectedRecipeId.value = null;
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-dialog {
  background-color: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  max-width: 500px;
  width: 100%;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  margin: 0;
}

.modal-body {
  margin-top: 1rem;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}
</style>
