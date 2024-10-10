import { createRouter, createWebHistory } from "vue-router";
import Home from "@views/Home.vue";
import ListRecette from "@views/recette/ListRecette.vue";
import AddRecette from "@views/recette/AddRecette.vue";
import EditRecette from "@views/recette/EditRecette.vue";
import ShowRecette from "@views/recette/ShowRecette.vue";
import NotFound from "@views/NotFound.vue";
import CategoryList from "../views/categorie/CategoryList.vue";
import AddCategory from "../views/categorie/AddCategory.vue";
import EditCategory from "../views/categorie/EditCategory.vue";
import ShowCategory from "../views/categorie/ShowCategory.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: Home
    },
    {
        path: "/recette",
        name: "recette",
        component: ListRecette
    },
    {
        path: "/recette/show/:id",
        name: "recette-show",
        component: ShowRecette
    },
    {
        path: "/recette/new",
        name: "recette-add",
        component: AddRecette
    },
    {
        path: "/recette/edit/:id",
        name: "recette-edit",
        component: EditRecette
    },
    { path: "/:pathMatch(.*)*", component: NotFound },
    {
        path: "/categorie",
        name: "categorie",
        component: CategoryList
    },
    {
        path: '/categories/add',
        name: 'category-add',
        component: AddCategory,
    },
    {
        path: '/categories/edit/:id',
        name: 'category-edit',
        component: EditCategory

    },
    {
        path: '/categories/:id',
        name: 'category-show',
        component: ShowCategory
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

export default router;