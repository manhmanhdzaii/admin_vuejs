<template>
  <div class="mb-3">
    <label for="">{{ label }}</label>
    <Field
      as="select"
      :name="name"
      class="form-control"
      v-model="value"
      :disabled="disabled"
      @change="save()"
    >
      <option value="">{{ placeholder }}</option>
      <option
        :value="value"
        v-for="(item, value, index) in arrSelect"
        :key="index"
      >
        {{ item }}
      </option>
    </Field>
    <span style="color: red" v-if="err">
      {{ err[0] }}
    </span>
    <ErrorMessage style="color: red" :name="name" />
  </div>
</template>
<script>
import { Field, ErrorMessage } from "vee-validate";
export default {
  name: "selectCpn",
  props: {
    label: {
      type: String,
      required: false,
      default: "",
    },
    name: {
      type: String,
      required: false,
      default: "",
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    placeholder: {
      type: String,
      required: false,
      default: "",
    },
    value: {
      type: String,
      required: false,
      default: "",
    },
    err: {
      type: Text,
      required: false,
      default: "",
    },
    arrSelect: {
      type: Object,
      required: false,
      default: [],
    },
  },
  methods: {
    save() {
      this.$emit("input", this.value, this.name);
    },
  },
  components: {
    Field,
    ErrorMessage,
  },
};
</script>

<style>
</style>