import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./assets/css/style.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "@router";
import App from "./App.vue";
import CustomButton from "@/components/CustomButton.vue";
import { createI18n } from "vue-i18n";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { dom } from "@fortawesome/fontawesome-svg-core";
import AddCategory from "./views/categorie/AddCategory.vue";
dom.watch();

// Ajouter les icônes FontAwesome
library.add(fas, fab, far);

// Messages pour les traductions (anglais et français)
const messages = {
  en: {
    recipes: {
      title: "My Recipes",
      noRecipes: "No Recipes Saved",
      addNew: "New Recipe",
      table: {
        number: "No.",
        title: "Title",
        type: "Type",
        category: "Category",
        actions: "Actions",
        ingredients: "Ingredients",
        confirmDelete:
          "Are you sure you want to delete the recipe {recipeTitle}?",
      },
      buttons: {
        view: "View",
        edit: "Edit",
        delete: "Delete",
      },
      addForm: {
        title: "Add a New Recipe",
        recipeTitle: "Title",
        recipeTitlePlaceholder: "Enter the recipe title",
        recipeType: "Type",
        ingredients: "Ingredients",
        ingredientsPlaceholder: "List of ingredients",
        save: "Save Recipe",
        category: "category",
      },

      App_page: {
        titre: "ZuKitchen",
        menu: "Recipes",
        menu2: "Category",
      },

      home_page: {
        acceuil: "Welcom to Zu kitchen !",
        paragraphe: "The tast of it",
        paragraphe2: "Your recipes, your cooking, your passion.",
      },
      edit_form: {
        champ_titre: "Title",
        champ_ingredient: "Ingredient",
        champ_type: "Type",
        button_add: "Save",
      },
      view_form: {
        champ_detail: "Recipe details",
        champ_titre: "Title",
        champ_type: "type",
        champ_ingredient: "Ingredient",
        button_close: "Close",
        champ_categorie: "category",
      },
      addNew: {
        title: "Add New Category",
      },
    },
    category: {
      title: "Category Manager",
      Added: "Add Category",
      name: "Name",
      actions: "Actions",
      message: "No Categories Found",
      editCategory: "Edit Category",
      addCategory: "Add Category",
      saveChanges: "Save Changes",
      add: "Add",
      cancel: "Cancel",
      edit: "Edit",
      delete: "Delete",
      view: "View",
      nameLabel: "Category Name",
      namePlaceholder: "Enter category name",
    },
  },
  fr: {
    recipes: {
      title: "Mes Recettes",
      noRecipes: "Aucune Recette Enregistrée",
      addNew: "Nouvelle Recette",
      table: {
        number: "N°",
        title: "Titres",
        type: "Type",
        category: "Categorie",
        actions: "Actions",
        ingredients: "Ingredients",
        confirmDelete:
          "Vous êtes sûr de vouloir supprimer la recette {recipeTitle} ?",
      },
      buttons: {
        view: "Voir",
        edit: "Modifier",
        delete: "Supprimer",
      },
      addForm: {
        title: "Ajouter une Nouvelle Recette",
        recipeTitle: "Titre",
        recipeTitlePlaceholder: "Entrez le titre de la recette",
        recipeType: "Type",
        ingredients: "Ingrédients",
        ingredientsPlaceholder: "Liste des ingrédients",
        save: "Enregistrer la Recette",
        category: "catégorie",
      },
      App_page: {
        titre: "cuisineZu",
        menu: "Recette",
        menu2: "Catégorie",
      },
      home_page: {
        acceuil: "Bienvenu Dans la cuisine de Zu !",
        paragraphe: "Le gout de ça",
        paragraphe2: "Vos recettes, votre cuisine, votre passion.",
      },
      edit_form: {
        champ_titre: "Titre",
        champ_ingredient: "Ingrédient",
        champ_type: "Type",
        button_add: "Enregistrer",
      },
      view_form: {
        champ_detail: "Détail du recette",
        champ_titre: "Titre",
        champ_type: "type",
        champ_ingredient: "Ingrédient",
        button_close: "Fermer",
        champ_categorie: "categorie",
      },
      addNew: {
        title: "Ajouter Une Nouvelle Recette",
      },
    },
    category: {
      title: "Gestion des Catégories",
      Added: "Ajouter une Catégorie",
      name: "Nom",
      actions: "Actions",
      message: "Aucune catégorie disponible.",
      editCategory: "Modifier la Catégorie",
      addCategory: "Ajouter une Catégorie",
      saveChanges: "Enregistrer les Modifications",
      add: "Ajouter",
      cancel: "Annuler",
      edit: "Modifier",
      delete: "Supprimer",
      view: "Voir",
      nameLabel: "Nom de la Catégorie",
      namePlaceholder: "Entrez le nom de la catégorie",
    },
  },
};

// Initialisation de vue-i18n
const i18n = createI18n({
  locale: "fr", // Langue par défaut
  fallbackLocale: "en", // Langue de secours
  messages,
});

const pinia = createPinia();
const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);
app.component("CustomBtn", CustomButton);

app.use(i18n);
app.use(pinia);
app.use(router);

app.mount("#app");
