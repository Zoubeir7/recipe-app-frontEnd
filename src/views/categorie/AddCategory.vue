<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useCategoryStore } from "@store/categoryStore";

const route = useRouter();
const categoryStore = useCategoryStore();

const newCategory = ref({
  name: "",
});

const submitCategory = async () => {
  if (!newCategory.value.name) return;

  await categoryStore.addCategory({ name: newCategory.value.name });
  route.push({ name: "categorie" });
};
</script>

<template>
  <div class="container mt-5">
    <h1 class="mb-4 text-center fw-bold text-warning">{{ t('categories.addForm.title') }}</h1>

    <div class="p-4 bg-light rounded shadow-sm">
      <div class="input-group mb-4">
        <span class="input-group-text bg-warning text-dark fw-bold">
          <i class="fas fa-tag"></i>&nbsp;{{ t('categories.addForm.categoryName') }}
        </span>
        <input type="text" class="form-control" :placeholder="t('categories.addForm.categoryNamePlaceholder')"
          v-model="newCategory.name" />
      </div>

      <button class="btn btn-warning w-100 fw-bold" @click="submitCategory" :disabled="!newCategory.name">
        <i class="fas fa-save"></i> {{ t('categories.addForm.save') }}
      </button>
    </div>
  </div>
</template>

<style scoped></style>
