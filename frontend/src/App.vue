<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

document.title = import.meta.env.VITE_APP_NAME;

</script>

<template>
    <div id="app">
        <nav style="margin-bottom: 1rem">
            <router-link to="/">Orders</router-link> |
            <router-link to="/create">Create Order</router-link>
        </nav>

        <router-view />
    </div>
</template>

<style scoped>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    margin: 1rem;
}
</style>
