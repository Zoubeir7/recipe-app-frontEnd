import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useCategoryStore = defineStore("category", () => {
  const categories = ref([]);

  const loadCategoriesFromAPI = async () => {
    try {
      const response = await axios.get("http://localhost:3002/categories");
      categories.value = response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories:", error);
    }
  };

  const addCategory = async (category) => {
    try {
      const response = await axios.post("http://localhost:3002/categories", category);
      categories.value.push(response.data);
    } catch (error) {
      console.error("Erreur lors de l'ajout de la catégorie:", error);
    }
  };


  const deleteCategory = async (categoryId) => {
    try {
      await axios.delete(`http://localhost:3002/categories/${categoryId}`);
      categories.value = categories.value.filter(
        (category) => category.id !== categoryId
      );
    } catch {
      alert(
        "Impossible de supprimer cette catégorie car elle est liée à une recette."
      );
    }
  };
 
  const updateCategory = async (category) => {
    try {
      const response = await axios.put(`http://localhost:3002/categories/${category.id}`, category);
      const index = categories.value.findIndex((cat) => cat.id === category.id);
      if (index !== -1) {
        categories.value[index] = response.data;
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la catégorie:", error);
    }
  };

  const getCategoryById = (categoryId) => {
    return categories.value.find(category => category.id === categoryId);
  };


  return {
    categories,
    loadCategoriesFromAPI,
    addCategory,
    deleteCategory,
    updateCategory,
    getCategoryById,
  };
});
