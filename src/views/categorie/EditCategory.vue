<template>
  <div class="container mt-5">
    <h3>Modifier la catégorie</h3>

    <div v-if="isLoading" class="text-center">
      <div class="spinner-border text-warning" role="status">
        <span class="visually-hidden">Chargement...</span>
      </div>
    </div>
    <div v-else>
      <form @submit.prevent="submitEditForm">
        <div class="input-group mb-3">
          <span class="input-group-text bg-warning text-dark fw-bold">
            <i class="fas fa-tags"></i>&nbsp;Nom de la catégorie
          </span>
          <input v-model="editedCategoryName" class="form-control" type="text" placeholder="Nom de la catégorie"
            required />
        </div>

        <div class="d-flex justify-content-between">
          <button class="btn btn-warning w-100 fw-bold me-2" type="submit">
            <i class="fas fa-save"></i> Modifier
          </button>
          <button class="btn btn-secondary w-100 fw-bold" type="button" @click="cancelEdit">
            Annuler
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useCategoryStore } from "@/store/categoryStore"; 
import { useRoute, useRouter } from "vue-router";

const categoryStore = useCategoryStore();
const route = useRoute();
const router = useRouter();

const editedCategoryName = ref("");
const isLoading = ref(true);

onMounted(async () => {
  const categoryId = route.params.id;
  try {
    await categoryStore.loadCategoriesFromAPI();
    console.log("Categories loaded:", categoryStore.categories);

    const selectedCategory = categoryStore.getCategoryById(parseInt(categoryId));
    console.log(selectedCategory)

    if (selectedCategory) {
      editedCategoryName.value = selectedCategory.name;
      console.log(editedCategoryName)
    } else {
      console.error("Catégorie non trouvée");
    }
  } catch (error) {
    console.error("Erreur lors du chargement des catégories :", error);
  } finally {
    isLoading.value = false;
  }
});

const submitEditForm = async () => {
  if (editedCategoryName.value.trim()) {
    try {
      await categoryStore.updateCategory({
        id: route.params.id,
        name: editedCategoryName.value,
      });
      router.push({ name: "categorie" });
    } catch (error) {
      console.error("Échec de la mise à jour de la catégorie :", error);
    }
  }
};

const cancelEdit = () => {
  router.push({ name: "categorie" });
};
</script>
