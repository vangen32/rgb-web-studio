<template>
  <div class="w-full flex flex-col">
		<h1 class="title grow-0 basis-auto">
			Створити користувача
		</h1>
		<div class="p-6 flex justify-center items-center basis-0 grow">
			<div class="w-full max-w-[400px] bg-white shadow-lg rounded-lg p-4">
				<h2 class="text-center text-lg font-semibold">Створення користувача</h2>
				<InputText class="w-full my-4" label="Ім'я користувача"
									 v-model="username"
									 :is-valid="isNameValid"
									 error-message="Мінімальна довжина імені 2 символи"/>
				<Button1 class="block mx-auto" :disabled="!isNameValid" @click.stop="createUser">
					Створити
				</Button1>
			</div>
		</div>
		<Loader class="fixed top-0 left-0 right-0 bottom-0 bg-black/40 z-10" v-if="isLoader"/>
  </div>
</template>

<script setup>
import InputText from "../../components/inputs/InputText.vue";
import Loader from "../../components/Loader.vue";
import {computed, ref, watch} from "vue";
import Button1 from "../../components/Button-1.vue";
import {useFetch, useRuntimeConfig} from "nuxt/app";

const config = useRuntimeConfig();


const username = ref("")
const isLoader = ref(false);


const isNameValid = computed(()=>{
	return username.value?.length >=2;
})

const createUser = async () => {
	const { data, pending, error } = await useFetch(`${config.public.BASE_URL}/user/create`, {
		method: "POST",
		body: {
			name: username.value,
		},
	});

	watch(pending, (newPending) => {
		isLoader.value = newPending;
	});

	if (error.value) {
		console.error("Error creating user:", error.value);
	} else {
		console.log("User created successfully:", data.value);
	}
};

</script>

<style scoped></style>
