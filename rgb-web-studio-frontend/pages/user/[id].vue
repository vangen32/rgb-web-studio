<template>
  <div class="w-full">
    <h1 class="title">Профіль користувача {{ user?.name }}</h1>
    <div class="p-6">
      <div class="flex flex-wrap gap-4">
        <UserCard
          v-if="user"
          :user="user"
          class="basis-[300px] grow-0 shrink-0"
          :is-select-button="false"
        />
        <SelectDropFileArea
          ref="fileArea"
          class="group basis-[300px] grow shrink-0 min-h-[150px]"
          @send-file="sendFile"
        />
      </div>
      <table
        class="w-full my-6 table-auto border-collapse"
        v-if="userFilesListData?.files"
      >
        <caption class="text-2xl font-semibold mb-4 text-left">
          Файли користувача
        </caption>
        <thead>
          <th>Id</th>
          <th>Завантажено</th>
          <th>Назва</th>
          <th>Розмір, Mб</th>
          <th>К-сть сторінок</th>
          <th>Формат</th>
          <th></th>
        </thead>
        <tbody>
          <tr v-for="file in userFilesListData.files" :key="file.id">
            <td>{{ file.id }}</td>
            <td>{{ formatCreatedAt(file.createdAt) }}</td>
            <td>{{ file.filename }}</td>
            <td>{{ (file.size / (1024 * 1024)).toFixed(2) }}</td>
            <td>{{ file.pages }}</td>
            <td>{{ file.format }}</td>
            <td>
              <NuxtLink
                class="block bg-blue-300 p-1 px-2 rounded-lg hover:bg-blue-400 cursor-pointer"
                :to="{
                  name: 'files-fileId',
                  params: { fileId: file.id },
                }"
              >
                Деталі
              </NuxtLink>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination
        v-if="totalPages > 1"
        :pages="totalPages"
        v-model="currenFilesListPage"
        class="mx-auto w-fit"
      />
    </div>
    <Loader
      class="fixed top-0 left-0 bottom-0 right-0 bg-black/40"
      v-if="isLoader"
    />
  </div>
</template>

<script setup>
import { useAsyncData, useRoute, useRouter, useRuntimeConfig } from "nuxt/app";
import { computed, ref, watch, onBeforeMount } from "vue";
import { useUserStore } from "../../stores/userStore.js";
import UserCard from "../../components/UserCard.vue";
import SelectDropFileArea from "../../components/inputs/SelectDropFileArea.vue";
import { toast } from "vue3-toastify";

const config = useRuntimeConfig();
const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

const toUserList = (page = 1) => {
  router.push({ name: "user-list-page", params: { page: page } });
};

const currenFilesListPage = ref(1);
const limit = ref(10);
const fileSending = ref(false);
const fileArea = ref(null);

const {
  data: user,
  pending: pendingUser,
  error,
  refresh: refreshUser,
} = useAsyncData(async () => {
  const url = `${config.public.BASE_URL}/user/${route.params.id}`;
  return await $fetch(url);
});

const {
  data: userFilesListData,
  pending: pendingUserFiles,
  error: errorUserFiles,
  refresh: refreshUserFiles,
} = useAsyncData(async () => {
  const url = `${config.public.BASE_URL}/files/list/user/${route.params.id}`;
  const params = { page: currenFilesListPage.value, limit: limit.value };
  return await $fetch(url, { params });
});

const sendFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    fileSending.value = true;
    const res = await $fetch(
      `${config.public.BASE_URL}/user/file-upload/${route.params.id}`,
      {
        body: formData,
        method: "POST",
      },
    );
    userFilesListData.value.files.splice(0, 0, res);
    userStore.addUserFile(res.id);
    fileArea.value.ClearSelectedFile();
  } catch (error) {
    toast.error(`Помилка при відправленні файлу: ${error}`);
    console.error(error);
  } finally {
    fileSending.value = false;
  }
};

const formatCreatedAt = (t) => {
  return t ? DateFormatter.GetDateTime(t) : "-";
};

const totalPages = computed(() => {
  return Math.ceil(userFilesListData.value?.totalRecords / limit.value);
});
const isLoader = computed(() => {
  return pendingUser.value || pendingUserFiles.value || fileSending.value;
});

watch(currenFilesListPage, async (newVal) => {
  await refreshUserFiles();
});
watch(
  () => route.params?.id,
  async (newVal) => {
    if (newVal) {
      await Promise.all([refreshUser(), refreshUserFiles()]);
    } else toUserList();
  },
);
watch(error, (newVal) => {
  if (newVal) {
    toast.error("Не вдалось завантажити дані користувача");
    toUserList();
  }
});
watch(user, (newVal) => {
  if (newVal) userStore.setSelectedUser(newVal);
  else toUserList();
});

onBeforeMount(() => {
  if (user.value) {
    userStore.setSelectedUser(user.value);
  } else if (error.value || errorUserFiles.value) {
    toast.error("При завантаженні профілю користувача щось пішло не так!");
    toUserList();
  }
});
</script>

<style scoped>
th,
td {
  @apply p-2 border border-gray-500 text-left;
}
</style>
