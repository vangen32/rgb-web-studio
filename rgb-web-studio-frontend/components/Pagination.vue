<template>
  <nav class="mt-4">
    <ul class="inline-flex items-center -space-x-px gap-2">
      <li v-on:click="getPreviousPage">
        <button
          href="#"
          class="flex justify-center items-center border bg-white shadow-[0px_5px_4px_-4px_rgba(0,0,0,0.02),0px_1px_2px_0px_rgba(0,0,0,0.06)] rounded-md border-solid border-[#E7E8E9] w-8 h-8 ml-0 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700"
        >
          <span class="sr-only">Previous</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
          >
            <path
              d="M14.8741 6.29289C14.4836 5.90237 13.8504 5.90237 13.4599 6.29289L8.45989 11.2929C8.06936 11.6834 8.06936 12.3166 8.45989 12.7071L13.4599 17.7071C13.8504 18.0976 14.4836 18.0976 14.8741 17.7071C15.2646 17.3166 15.2646 16.6834 14.8741 16.2929L10.5812 12L14.8741 7.70711C15.2646 7.31658 15.2646 6.68342 14.8741 6.29289Z"
              fill="#2C2E30"
            />
          </svg>
        </button>
      </li>
      <li v-for="(page, index) in displayedPages">
        <template v-if="page === null">
          <span
            class="flex items-center align-middle rounded bg-[rgba(35,55,55,0.05)] p-1 w-8 h-8 justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="4"
              viewBox="0 0 13 4"
              fill="none"
            >
              <path
                d="M8 2C8 2.82843 7.32843 3.5 6.5 3.5C5.67157 3.5 5 2.82843 5 2C5 1.17157 5.67157 0.5 6.5 0.5C7.32843 0.5 8 1.17157 8 2Z"
                fill="#A0A3A6"
              />
              <path
                d="M3 2C3 2.82843 2.32843 3.5 1.5 3.5C0.671573 3.5 0 2.82843 0 2C0 1.17157 0.671573 0.5 1.5 0.5C2.32843 0.5 3 1.17157 3 2Z"
                fill="#A0A3A6"
              />
              <path
                d="M13 2C13 2.82843 12.3284 3.5 11.5 3.5C10.6716 3.5 10 2.82843 10 2C10 1.17157 10.6716 0.5 11.5 0.5C12.3284 0.5 13 1.17157 13 2Z"
                fill="#A0A3A6"
              />
            </svg>
          </span>
        </template>
        <template v-else>
          <button
            :class="page === modelValue ? 'active' : ''"
            v-on:click="setCurrentPage(page)"
            class="flex rounded justify-center items-center p-1 w-8 h-8 text-[#A0A3A6] bg-white border-gray-300 border text-center text-[13px] not-italic font-semibold leading-3 tracking-[-0.04px]"
          >
            {{ page }}
          </button>
        </template>
      </li>
      <li v-on:click="getNextPage">
        <button
          href="#"
          class="flex justify-center items-center border bg-white shadow-[0px_5px_4px_-4px_rgba(0,0,0,0.02),0px_1px_2px_0px_rgba(0,0,0,0.06)] rounded-md border-solid border-[#E7E8E9] w-8 h-8 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700"
        >
          <span class="sr-only">Next</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
          >
            <path
              d="M10.1259 17.7071C10.5164 18.0976 11.1496 18.0976 11.5401 17.7071L16.5401 12.7071C16.9306 12.3166 16.9306 11.6834 16.5401 11.2929L11.5401 6.29289C11.1496 5.90237 10.5164 5.90237 10.1259 6.29289C9.73538 6.68342 9.73538 7.31658 10.1259 7.70711L14.4188 12L10.1259 16.2929C9.73538 16.6834 9.73538 17.3166 10.1259 17.7071Z"
              fill="#2C2E30"
            />
          </svg>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { defineProps, defineEmits, computed, ref } from "vue";

const props = defineProps({
  modelValue: Number,
  pages: Number,
});

const emit = defineEmits(["update:modelValue"]);

const limitPages = ref(3);

const displayedPages = computed(() => {
  const pages = [];
  const { modelValue: currentPage, pages: totalPages } = props;

  const addPageRange = (start, end) => {
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
  };

  if (totalPages <= limitPages.value) {
    addPageRange(1, totalPages);
  } else {
    if (currentPage <= limitPages.value) {
      addPageRange(1, limitPages.value);
      if (totalPages > limitPages.value + 1) {
        pages.push(null);
      }
      addPageRange(totalPages, totalPages);
    } else if (currentPage >= totalPages - limitPages.value + 1) {
      addPageRange(1, 1);
      if (totalPages > limitPages.value + 1) {
        pages.push(null);
      }
      addPageRange(totalPages - limitPages.value + 1, totalPages);
    } else {
      addPageRange(1, 1);
      if (totalPages > limitPages.value + 1) {
        pages.push(null);
      }
      addPageRange(currentPage - 1, currentPage + 1);
      if (totalPages > limitPages.value + 1) {
        pages.push(null);
      }
      addPageRange(totalPages, totalPages);
    }
  }

  return pages;
});

const getPreviousPage = () => {
  if (props.modelValue > 1) {
    emit("update:modelValue", props.modelValue - 1);
  }
};

const getNextPage = () => {
  if (props.modelValue < props.pages) {
    emit("update:modelValue", props.modelValue + 1);
  }
};

const setCurrentPage = (page) => {
  if (page && page > 0 && page <= props.pages) {
    emit("update:modelValue", page);
  }
};
</script>

<style scoped>
.active {
  background: #2563eb;
  color: white;
}
</style>
