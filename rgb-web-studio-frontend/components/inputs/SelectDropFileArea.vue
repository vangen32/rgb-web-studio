<template>
  <div
    class="group file-drop-area relative"
    :class="{
      'bg-green-200 text-white border-green-500': isDragOver,
      'bg-gray-200 text-gray-500 border-gray-500': !isDragOver,
      'bg-red-100 text-red-500 border-red-500':
        !isFileSizeValid && selectedFile,
    }"
    @click="openFilePicker"
    @dragover.prevent="handleDragOver"
    @dragend.prevent="handleDragEnd"
    @dragleave.prevent="isDragOver = false"
    @drop.prevent="handleDrop"
  >
    <input
      ref="fileInput"
      type="file"
      id="file-uploader"
      name="file"
      class="hidden"
      accept=".pdf"
      multiple="false"
      @change="handleFileChange"
    />
    <div class="material-symbols-outlined text-[80px]">upload_file</div>
    <div class="text-center">
      {{ textContent }}
    </div>
    <button
      class="btn"
      @click.stop="handleButtonClick"
      :class="{
        invisible: !selectedFile,
        'btn-valid': isFileSizeValid,
        'btn-invalid': !isFileSizeValid,
      }"
    >
      {{ buttonText }}
    </button>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

const emit = defineEmits(["send-file"]);

const fileInput = ref(null);
const isDragOver = ref(false);
const selectedFile = ref(null);

const openFilePicker = () => {
  fileInput.value.click();
};

const handleDragOver = (event) => {
  event.preventDefault();
  isDragOver.value = true;
};

const handleDragEnd = (event) => {
  event.preventDefault();
  isDragOver.value = false;
  console.log("DRAG end");
};

const handleDrop = async (event) => {
  event.preventDefault();
  isDragOver.value = false;
  const files = event.dataTransfer.files;
  if (files.length > 1) {
    console.error("Тільки 1 файл");
  } else setSelectedFile(files[0]);
};

const handleFileChange = (event) => {
  event.preventDefault();
  const file = event.target.files[0];
  if (event.target.files.length > 1) {
    console.error("Тільки 1 файл");
  } else if (file) {
    setSelectedFile(file);
  }
};

const setSelectedFile = (file) => {
  if (file.type !== "application/pdf") {
    console.error("Файл .pdf");
  } else {
    selectedFile.value = file;
  }
};

const handleButtonClick = () => {
  if (!isFileSizeValid.value) {
    selectedFile.value = null;
  } else {
    emit("send-file", selectedFile.value);
  }
};

const ClearSelectedFile = () => {
  selectedFile.value = null;
};

const textContent = computed(() => {
  if (!selectedFile.value)
    return "Натисніть для вибору або перетягніть файл формату .pdf об'ємом не більше 5Мб";
  else if (!isFileSizeValid.value) {
    return "Файл перевищує дозволений розмір в 5 Мб";
  } else {
    const fileSizeInMb = selectedFile.value?.size / (1024 * 1024);
    return `${selectedFile.value.name} ${fileSizeInMb.toFixed(2)} Мб`;
  }
});

const isFileSizeValid = computed(() => {
  return selectedFile.value?.size <= 5 * 1024 * 1024;
});

const buttonText = computed(() => {
  return isFileSizeValid.value ? "Відправити" : "Скасувати";
});

defineExpose({
  ClearSelectedFile,
});
</script>

<style scoped>
.file-drop-area {
  @apply border-2 rounded-xl
	flex flex-col gap-4  justify-center items-center
	p-6 duration-300 cursor-pointer;
}

.file-drop-area div {
  pointer-events: none;
}
.btn {
  @apply bg-gray-50 px-4 py-1 min-w-[150px]
	font-semibold rounded-lg border;
}
.btn-valid {
  @apply hover:bg-blue-300 border-blue-500 text-blue-500;
}
.btn-invalid {
  @apply hover:bg-red-300 border-red-500 text-red-500;
}
</style>
