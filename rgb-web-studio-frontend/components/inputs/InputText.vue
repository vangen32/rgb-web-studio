<template>
  <label
    class="block"
    @mouseenter="setHover(true)"
    @mouseleave="setHover(false)"
  >
    <div class="text-black-1 text-h4">{{ label }}</div>
    <div
      class="rounded-lg p-1 my-1 flex h-fit items-center bg-white"
      :class="{
        'input-default': !isFocused,
        'input-focused': isFocused,
        'input-invalid': isInvalidStyle,
        'input-valid': isValidStyle,
        'input-disabled': disabled,
      }"
    >
      <input
        type="text"
        class="outline-none text-black-1 text-h4  w-full bg-transparent"
        @focusin="setFocus(true)"
        @focusout="setFocus(false)"
        :placeholder="placeholder"
        :disabled="disabled"
        :value="modelValue"
        @input="updateModelValue"
      />
    </div>
    <div
      class="text-mobile h-[18px]"
      :class="{
        'text-gray-500': isValid,
        'text-red-500': !isValid,
      }"
    >
      {{ underInputText }}
    </div>
  </label>
</template>
<script>
export default {
  name: "InputText",
  emits: ["update:modelValue"],
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
    },
    tooltip: {
      type: String,
    },
    modelValue: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    isValid: {
      type: Boolean,
      default: true,
    },
    errorMessage: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isFocused: false,
      isHover: false,
      isTouched: false,
    };
  },
  methods: {
    setFocus(val) {
      if (val) this.isTouched = true;
      this.isFocused = val;
    },
    setHover(val) {
      this.isHover = val;
    },
    updateModelValue(e) {
      this.$emit("update:modelValue", e.target.value);
    },
    resetAll() {
      this.isFocused = false;
      this.isHover = false;
      this.isTouched = false;
    },
  },
  computed: {
    isInvalidStyle() {
      return this.isTouched && !this.isValid && !this.isFocused;
    },
    isValidStyle() {
      return this.isTouched && this.isValid && !this.isFocused;
    },
    errorMessageC() {
      if (!this.isTouched || this.isFocused) return;
      else return this.errorMessage;
    },
    underInputText() {
      return this.isValid ? this.tooltip : this.errorMessageC;
    },
  },
};
</script>

<style scoped>

input::placeholder {
	@apply text-gray-500 font-[450];
}

.input-default {
	box-shadow: inset rgba(128, 128, 128, 0.36) 0px 0px 0px 1px;
}
.input-valid {
	box-shadow: inset rgba(128, 128, 128, 0.36) 0px 0px 0px 1px;
}
.input-focused {
	box-shadow: inset #2b42d7 0px 0px 0px 1px;
}

.input-invalid {
	box-shadow: inset #ff0000 0px 0px 0px 1px;
}

.input-disabled {
	box-shadow: inset #6e6e6e 0px 0px 0px 1px;
}

.input-disabled input {
	@apply text-gray-500;
}

</style>
