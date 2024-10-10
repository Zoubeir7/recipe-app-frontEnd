<template>
    <div class="container mt-5" v-if="category">
        <h1 class="mb-4 text-center fw-bold">{{ category.name }}</h1>
        <p><strong>ID :</strong> {{ category.id }}</p>
        <!-- Ajoutez d'autres détails ici -->
        <button class="btn btn-secondary" @click="goBack">Retour</button>
    </div>
    <div class="text-center" v-else>
        <p>Chargement des détails...</p>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useCategoryStore } from "@store/categoryStore";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const store = useCategoryStore();
const category = ref(null);

onMounted(async () => {
    const categoryId = route.params.id;
    category.value = store.getCategoryById(Number(categoryId));
;
});

const goBack = () => {
    router.push({ name: 'categorie' }); // Assurez-vous que le nom correspond à votre route de liste des catégories
};
</script>