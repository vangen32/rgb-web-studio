<template>
	<div class="w-full">
	<h1 class="title">
		Деталі файлу ID:{{file?.id}}
	</h1>
	<div class="p-6">
		<table class="table-auto border-collapse">
			<tbody>
				<tr v-for="field in fileData">
					<th>{{field.title}}</th>
					<td>{{field.value}}</td>
					<td>
						<NuxtLink v-if="field.href"
											class="block bg-blue-300 p-1 px-2 rounded-lg hover:bg-blue-400 cursor-pointer"
											:to="field.href">
							Деталі
						</NuxtLink>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
<!--		<Loader class="fixed top-0 left-0 bottom-0 right-0 bg-black/40" v-if="isLoader"/>-->
	</div>
</template>

<script setup>
import {useAsyncData, useRoute} from "nuxt/app";
import {computed, onBeforeMount} from "vue";
import {useRouter, useRuntimeConfig} from "nuxt/app";

const config = useRuntimeConfig()
const router = useRouter()
const route = useRoute()

const {data : file, pending : pendingFile, error, refresh : refreshFile} =  useAsyncData(
	async () => {
		const url = `${config.public.BASE_URL}/files/${route.params.fileId}`;
		return await $fetch(url);
	})

const fileData = computed(()=>{
	const fileData = []
	if(file.value){
		const addField = (title, value, href = undefined)=>{
			fileData.push({
				title, value, href
			})
		}
		addField("ID", file.value.id)
		addField("Дата завантаження", file.value.createdAt ? DateFormatter.GetDateTime(file.value.createdAt) : "-")
		addField("Назва", file.value.filename)
		addField("Сторінки, к-сть", file.value.pages)
		addField("Формат", file.value.format)
		addField("Розмір, Мб", FileSizeConverter.ByteToMb(file.value.size).toFixed(2))
		addField("Власник", file.value.user.name, {name : "user-id", params : {id : file.value.user.id}})

	}
	return fileData
})

onBeforeMount(() => {
 if(error.value ) {
		router.back();
	}
});
</script>

<style scoped>
th, td {
	@apply p-2 border border-gray-500 text-left;
}
</style>