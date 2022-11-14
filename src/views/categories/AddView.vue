<template>
  <div class="d-sm-flex align-items-center justify-content-between mb-4">
    <h1 class="h3 mb-0 text-gray-800">Thêm danh mục sản phẩm</h1>
  </div>
  <CategoryCpm
    :isPointer="isPointer"
    @changeCategory="save"
    :err="err"
    :category="category"
    :schema="schema"
    :title="title"
  />
</template>

<script>
import CategoryCpm from "@/components/Category.vue";
import Categories from "@/repository/categories";
import { Form } from "vee-validate";
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
      title: "Thêm mới",
    };
  },
  components: {
    Form,
    CategoryCpm,
  },
  computed: {
    schema() {
      return yup.object({
        name: yup.string().required().label("Name"),
      });
    },
  },
  methods: {
    save(category) {
      this.isPointer = true;
      var data = {
        name: category.name,
      };
      Categories.post(data).then(
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