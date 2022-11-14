<template>
  <Form @submit="save()" :validation-schema="schema">
    <inputCpn
      label="Tên danh mục"
      name="name"
      type="text"
      placeholder="Nhập tên danh mục...."
      :value="category.name"
      :err="err.name ? err.name[0] : ''"
      @input="chageValue"
    />
    <button
      class="btn btn-primary"
      type="submit"
      :class="{ pointer: isPointer }"
    >
      Thêm mới
    </button>
  </Form>
</template>

<script>
import inputCpn from "./common/InputCpn.vue";
import { Form } from "vee-validate";
export default {
  name: "categoryCpn",
  props: {
    isPointer: {
      type: Boolean,
      required: false,
      default: false,
    },
    err: {
      type: Array,
      required: false,
      default: [],
    },
    category: {
      type: Array,
      required: false,
      default: [],
    },
    schema: {
      type: Array,
      required: false,
      default: [],
    },
    title: {
      type: String,
      required: false,
      default: "",
    },
  },
  components: {
    Form,
    inputCpn,
  },
  methods: {
    save() {
      this.$emit("changeCategory", this.category);
    },
    chageValue(val, name) {
      this.category[name] = val;
    },
  },
};
</script>

<style>
</style>