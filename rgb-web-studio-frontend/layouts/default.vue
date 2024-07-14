<template>
  <div class="min-h-screen flex flex-nowrap">
  	<aside>
			<div class="px-6 py-2 mb-6">
				<img
					src="public/favicon-rgb.ico"
					class="h-6 w-auto inline-block mr-4"
				/>
				<span class="font-semibold text-2xl align-middle">File storage</span>
			</div>
			<NuxtLink class="user-name  flex items-center rounded-lg text-white pr-2"
					 :class="{'bg-blue-800' : selectedUser}"
								:to="{name : 'user-id', params : {id : selectedUser?.id ?? '-1'}}"
			>
				<template v-if="selectedUser">
					<span class="font-light">Користувач:</span>
					<span class="px-2 pl-4">
					{{selectedUser?.name}}
					</span>
					<span class="text-gray-2 text-sm ">
						#{{selectedUser?.id.substring(selectedUser?.id.length-6)}}
					</span>
				</template>
			</NuxtLink>
  	  <NuxtLink class="link" v-for="(link, i) in links" :to="link.to" :key="i">
				<div class="material-symbols-outlined icon">
					{{ link.icon }}
				</div>
				{{link.desc}}
			</NuxtLink>
  	</aside>
  	<slot />
  </div>
</template>

<script setup>
import {computed, ref} from "vue";
import {useUserStore} from "../stores/userStore.js";

const userStore = useUserStore()

const selectedUser = computed(()=>{
	return userStore.selectedUser;
});

const links = ref(
	[
		{
			desc: "Список користувачів",
			icon : "group",
			to: { name: "user-list-page", params : {page : 1} },
		},
		{
			desc: " Створити користувача",
			icon : "person_add",
			to: { name: "user-create" },
		},
	]);
</script>

<style scoped>
aside {
  @apply w-[300px] shrink-0 bg-white h-screen py-4 sticky top-0 flex flex-col flex-nowrap gap-0.5 shadow px-3;
}
.link {
	@apply duration-700 flex items-center justify-start gap-4 p-2 rounded-lg font-semibold;
}
.link.router-link-exact-active {
	@apply bg-blue-5 text-blue-2 bg-blue-1 ;
}

.router-link-exact-active .icon{
	@apply text-blue-2;
}
.icon{
	@apply text-gray-2;
}

.user-name{
	@apply min-h-10 h-fit px-2 my-2;
	font-family: "Oswald", sans-serif;
}
</style>
