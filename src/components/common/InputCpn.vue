<template>
  <div class="mb-3">
    <label for="">{{ label }}</label>
    <Field
      :name="name"
      :type="type"
      class="form-control"
      :placeholder="placeholder"
      v-model="value"
      @change="save()"
    />
    <span style="color: red" v-if="err"> {{ err }} </span>
    <ErrorMessage style="color: red" :name="name" />
  </div>
</template>

<script>
import { Field, ErrorMessage } from "vee-validate";
export default {
  name: "inputCpn",
  data() {
    return {};
  },
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
    type: {
      type: String,
      required: false,
      default: "",
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