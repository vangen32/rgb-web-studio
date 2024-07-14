<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script>
export default {
  name: "index",
};
</script>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

router.push({ name: "user-list-page", params: { page: 1 } });
</script>

<style scoped>
.select-user-wrapper {
}
</style>
