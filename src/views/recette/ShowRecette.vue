<template>
  <div class="container mt-5" v-if="recette">
    <h1 class="mb-4 text-center fw-bold text-warning">{{ recette.title }}</h1>
    <p><strong>Type :</strong> {{ recette.type }}</p>
    <p><strong>Catégorie :</strong> {{ getCategoryTitle(recette.category_id) }}</p>
    <h4>Ingrédients :</h4>
    <!-- Liste en ligne avec des tirets pour séparer les ingrédients -->
    <p>
      <span v-for="(ingredient, index) in recette.ingredients" :key="ingredient">
        {{ ingredient }}<span v-if="index < recette.ingredients.length - 1"></span>
      </span>
    </p>
    <button class="btn btn-secondary mt-3" @click="goBack">Retour</button>
  </div>
  <div class="text-center mt-5" v-else>
    <p>Aucune recette trouvée.</p>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useRecipeStore } from '@store/recipeStore';
import { useCategoryStore } from '@store/categoryStore';

const route = useRoute();
const router = useRouter();
const recipeStore = useRecipeStore();
const categoryStore = useCategoryStore();
const recette = ref(null);

onMounted(async () => {
  if (!recipeStore.recettes.length) {
    await recipeStore.loadDataFromApi();
    console.log("Recettes après chargement :", recipeStore.recettes);
  }
  if (!categoryStore.categories.length) {
    await categoryStore.loadCategoriesFromAPI();
    console.log("Catégories après chargement :", categoryStore.categories);
  }

  recette.value = recipeStore.recettes.find(r => String(r.id) === String(route.params.id));
  console.log("Recette trouvée :", recette.value);
});

watch(
  () => [recipeStore.recettes, route.params.id],
  () => {
    recette.value = recipeStore.recettes.find(r => String(r.id) === String(route.params.id));
  },
  { immediate: true }
);

const getCategoryTitle = (categoryId) => {
  const category = categoryStore.categories.find(c => c.id === categoryId);
  return category ? category.name : "Non définie";
};

const goBack = () => {
  router.go(-1);
};
</script>