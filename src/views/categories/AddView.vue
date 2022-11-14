<template>
  <div class="d-sm-flex align-items-center justify-content-between mb-4">
    <h1 class="h3 mb-0 text-gray-800">Thêm danh mục sản phẩm</h1>
  </div>
  <Form @submit="save()" :validation-schema="schema">
    <div class="mb-3">
      <label for="">Tên danh mục</label>
      <Field
        name="name"
        type="text"
        class="form-control"
        placeholder="Nhập tên danh mục...."
        v-model="category.name"
      />
      <span style="color: red" v-if="err.name"> {{ err.name[0] }} </span>
      <ErrorMessage style="color: red" name="name" />
    </div>
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
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
  name: "adduser",
  data() {
    return {
      category: {
        name: "",
      },
      err: [],
      isPointer: false,
    };
  },
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  computed: {
    schema() {
      return yup.object({
        name: yup.string().required().label("Name"),
      });
    },
  },
  methods: {
    save() {
      this.isPointer = true;
      this.$request({
        method: "post",
        url: import.meta.env.VITE_API_URL + "categories/",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          name: this.category.name,
        },
      }).then(
        (res) => {
          if (res.data.status == "success") {
            alert("Thêm mới danh mục sản phẩm thành công");
            this.$router.push("/categories/list");
          } else {
            alert("Thêm mới danh mục sản phẩm thất bại");
          }
        },
        (err) => {
          this.isPointer = false;
          this.err = err.response.data.errors;
        }
      );
    },
  },
};
</script>

<style>
</style>