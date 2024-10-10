<template>
  <div class="container mt-5">
    <h1 class="mb-4 text-center fw-bold text-warning">Ajouter une nouvelle recette</h1>

    <div class="p-4 bg-light rounded shadow-sm">

      <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
      <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>

      <div class="input-group mb-4">
        <span class="input-group-text bg-warning text-dark fw-bold">
          <i class="fas fa-pen"></i>&nbsp;Titre de la recette
        </span>
        <input type="text" class="form-control" placeholder="Saisir le titre de la recette" v-model="newRecipe.title" />
      </div>

      <div class="input-group mb-4">
        <span class="input-group-text bg-warning text-dark fw-bold">
          <i class="fas fa-utensils"></i>&nbsp;Type de recette
        </span>
        <select class="form-select" v-model="newRecipe.type">
          <option value="entrée">Entrée</option>
          <option value="plat">Plat</option>
          <option value="dessert">Dessert</option>
        </select>
      </div>

      <div class="input-group mb-4">
        <span class="input-group-text bg-warning text-dark fw-bold">
          <i class="fas fa-carrot"></i>&nbsp;Ingrédients
        </span>
        <input type="text" class="form-control" placeholder="Liste des ingrédients" v-model="newRecipe.ingredients" />
      </div>

      <div class="input-group mb-4">
        <span class="input-group-text bg-warning text-dark fw-bold">
          <i class="fas fa-tags"></i>&nbsp;Catégorie
        </span>
        <select class="form-select" v-model="newRecipe.category_id">
          <option disabled value="">Sélectionner une catégorie</option>
          <option v-for="category in categoryStore.categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>

      <button class="btn btn-warning w-100 fw-bold" @click="submitRecipe"
        :disabled="!newRecipe.title || !newRecipe.type || !newRecipe.ingredients || !newRecipe.category_id">
        <i class="fas fa-save"></i> Sauvegarder la recette
      </button>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useRecipeStore } from "@store/recipeStore";
import { useCategoryStore } from "../../store/categoryStore";

const route = useRouter();
const recipeStore = useRecipeStore();
const categoryStore = useCategoryStore();

const newRecipe = ref({
  title: "",
  type: "",
  ingredients: "",
  category_id: null,
});

const errorMessage = ref("");
const successMessage = ref("");

onMounted(async () => {
  try {
    await categoryStore.loadCategoriesFromAPI();
  } catch (error) {
    errorMessage.value = "Erreur lors du chargement des catégories.";
  }
});

const submitRecipe = async () => {
  errorMessage.value = "";
  successMessage.value = "";

  if (!newRecipe.value.title || !newRecipe.value.type || !newRecipe.value.ingredients || !newRecipe.value.category_id) {
    errorMessage.value = "Veuillez remplir tous les champs.";
    return;
  }

  try {
    console.log("Envoi de la recette:", newRecipe.value);
    await recipeStore.addRecipeToAPI(newRecipe.value);
    successMessage.value = "Recette ajoutée avec succès !";
    route.push({ name: "recette" });
  } catch (error) {
    console.error("Erreur lors de l'ajout de la recette:", error);
    errorMessage.value = "Une erreur est survenue lors de l'ajout de la recette.";
  }
};
</script>
