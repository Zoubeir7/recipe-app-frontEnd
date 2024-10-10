<template>
  <div class="container mt-5">
    <h1 class="mb-4 text-center fw-bold text-warning">Liste des Catégories</h1>

    <div class="text-end mb-4">
      <button class="btn btn-warning fw-bold" @click="goToAddCategoryPage">
        <i class="fas fa-plus"></i> Ajouter une catégorie
      </button>
    </div>

    <div v-if="store.categories.length === 0" class="text-center">
      <p>Aucune catégorie trouvée.</p>
    </div>

    <table v-else class="table table-striped table-bordered">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nom</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(category, index) in store.categories" :key="category.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ category.name }}</td>
          <td class="text-center">
            <!-- Bouton Modifier -->
            <button class="btn btn-sm btn-outline-primary me-2" @click="goToEditCategoryPage(category.id)">
              <i class="fas fa-edit"></i>
            </button>

            <!-- Bouton Supprimer -->
            <button class="btn btn-sm btn-outline-danger me-2" @click="openConfirmationModal(category.id)">
              <i class="fas fa-trash"></i>
            </button>

            <!-- Bouton Aperçu -->
            <button class="btn btn-sm btn-outline-info" @click="goToPreviewCategoryPage(category.id)">
              <i class="fas fa-eye"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal de confirmation -->
    <div v-if="showModal" class="modal d-block" tabindex="-1" style="background-color: rgba(0, 0, 0, 0.5);">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirmer la suppression</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <p>Êtes-vous sûr de vouloir supprimer cette catégorie ?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Annuler</button>
            <button type="button" class="btn btn-danger" @click="confirmDeleteCategory">Supprimer</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useCategoryStore } from "@store/categoryStore";
import { useRouter } from "vue-router";

const store = useCategoryStore();
const router = useRouter();
const showModal = ref(false);
const selectedCategoryId = ref(null);

onMounted(() => {
  store.loadCategoriesFromAPI();
});

const goToAddCategoryPage = () => {
  router.push({ name: 'category-add' });
};

// Rediriger vers la page d'édition de la catégorie
const goToEditCategoryPage = (categoryId) => {
  router.push({ name: 'category-edit', params: { id: categoryId } });
};

// Rediriger vers la page de prévisualisation de la catégorie
const goToPreviewCategoryPage = (categoryId) => {
  router.push({ name: 'category-show', params: { id: categoryId } });
};

// Ouvrir le modal de confirmation
const openConfirmationModal = (categoryId) => {
  selectedCategoryId.value = categoryId;
  showModal.value = true;
};


const confirmDeleteCategory = async () => {
  if (selectedCategoryId.value) {
    try {
      await store.deleteCategory(selectedCategoryId.value);
      showModal.value = false;
      selectedCategoryId.value = null;
      errorMessage.value = "";
      await store.loadCategoriesFromAPI();
    } catch (error) {
      if (error.response && error.response.status === 409) {
        // Afficher une alerte pour informer que la catégorie est liée à une recette
        alert("Cette catégorie est liée à une recette et ne peut pas être supprimée.");
      } else {
        errorMessage.value = t("category.table.generic_error");
      }
      showModal.value = false;
    }
  }
};


// Fermer le modal
const closeModal = () => {
  showModal.value = false;
  selectedCategoryId.value = null;
};
</script>

<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
