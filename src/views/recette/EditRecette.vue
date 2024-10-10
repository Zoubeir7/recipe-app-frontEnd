<script setup>
import { ref, onMounted } from "vue";
import { useRecipeStore } from "@store/recipeStore";
import { useCategoryStore } from "@store/categoryStore";
import { useRouter } from "vue-router";

// Récupérer les stores et router
const recetteStore = useRecipeStore();
const categorieStore = useCategoryStore();
const router = useRouter();

// Déclarer la recette et l'état de chargement
const nouvelleRecette = ref({ title: '', type: '', ingredients: '', category_id: '' });
const estChargement = ref(true);
const recetteId = router.currentRoute.value.params.id;

// Charger les catégories et, si nécessaire, charger la recette à modifier
onMounted(async () => {
  await categorieStore.loadCategoriesFromAPI();

  if (recetteId) {
    try {
      const recette = await recetteStore.getRecipeById(recetteId);
      if (recette) {
        Object.assign(nouvelleRecette.value, recette);
        console.log("Recette chargée :", nouvelleRecette.value);
      } else {
        console.error("Recette non trouvée pour l'ID :", recetteId);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de la recette :", error);
    }
  }

  estChargement.value = false;
});

// Fonction pour annuler et retourner à la page des recettes
const cancelhome = () => {
  router.push({ name: 'recette' });
};

// Fonction pour sauvegarder la recette modifiée
const enregistrerRecette = async () => {
  if (!nouvelleRecette.value.title || !nouvelleRecette.value.ingredients || !nouvelleRecette.value.category_id) {
    console.error("Veuillez remplir tous les champs obligatoires.");
    return;
  }

  try {
    console.log("ID de la catégorie sélectionnée :", nouvelleRecette.value.category_id);

    // Utiliser l'ID de la recette pour l'éditer
    await recetteStore.editRecipe({ ...nouvelleRecette.value, id: recetteId });
    await recetteStore.loadDataFromApi(); // Recharger les recettes
    router.push({ name: 'recette' }); // Redirection vers la liste des recettes
  } catch (error) {
    console.error("Erreur lors de l'enregistrement de la recette :", error);
  }
};
</script>

<template>
  <div class="container mt-5">
    <h3>Modifier la recette</h3>
    <div class="p-4 bg-light rounded shadow-sm">
      <!-- Afficher le chargement -->
      <div v-if="estChargement" class="text-center">
        <div class="spinner-border text-warning" role="status">
          <span class="visually-hidden">Chargement...</span>
        </div>
      </div>

      <!-- Formulaire de modification -->
      <div v-else>
        <!-- Titre de la recette -->
        <div class="input-group mb-4">
          <span class="input-group-text bg-warning text-dark fw-bold">
            <i class="fas fa-pen"></i>&nbsp;Titre de la recette
          </span>
          <input type="text" class="form-control" placeholder="Titre de la recette" v-model="nouvelleRecette.title" />
        </div>

        <!-- Type de recette -->
        <div class="input-group mb-4">
          <span class="input-group-text bg-warning text-dark fw-bold">
            <i class="fas fa-utensils"></i>&nbsp;Type de recette
          </span>
          <select class="form-select" v-model="nouvelleRecette.type">
            <option value="entrée">Entrée</option>
            <option value="plat">Plat</option>
            <option value="dessert">Dessert</option>
          </select>
        </div>

        <!-- Ingrédients de la recette -->
        <div class="input-group mb-4">
          <span class="input-group-text bg-warning text-dark fw-bold">
            <i class="fas fa-carrot"></i>&nbsp;Ingrédients
          </span>
          <input type="text" class="form-control" placeholder="Liste des ingrédients (séparés par des virgules)"
            v-model="nouvelleRecette.ingredients" />
        </div>

        <!-- Catégorie de la recette -->
        <div class="input-group mb-4">
          <span class="input-group-text bg-warning text-dark fw-bold">
            <i class="fas fa-tags"></i>&nbsp;Catégorie
          </span>
          <select class="form-select" v-model="nouvelleRecette.category_id">
            <!-- Boucle sur les catégories pour les afficher dans le dropdown -->
            <option v-for="category in categorieStore.categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
        </div>

        <!-- Boutons pour sauvegarder ou annuler -->
        <div class="d-flex justify-content-between">
          <button class="btn btn-warning fw-bold me-2" type="submit" @click="enregistrerRecette" style="flex: 1;">
            <i class="fas fa-save"></i> Modifier
          </button>
          <button class="btn btn-secondary fw-bold" @click="cancelhome" style="flex: 1;">
            Annuler
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Styles spécifiques à ce composant */
</style>
