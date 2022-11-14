<template>
  <div class="d-sm-flex align-items-center justify-content-between mb-4">
    <h1 class="h3 mb-0 text-gray-800">Sửa danh mục sản phẩm</h1>
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
import Categories from "@/repository/categories";
import CategoryCpm from "@/components/Category.vue";
import { Form } from "vee-validate";
import * as yup from "yup";
export default {
  name: "editcategories",
  data() {
    return {
      category: [],
      err: [],
      isPointer: false,
      title: "Cập nhật",
    };
  },
  created() {
    this.getCategory();
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
    getCategory() {
      Categories.getById(this.$route.params.id).then((res) => {
        if (res.data.status == "success") {
          this.category = res.data.data;
        } else {
          alert("có lỗi xảy ra");
          this.$router.push("/categories/list");
        }
      });
    },
    save(category) {
      this.isPointer = true;
      var data = {
        name: category.name,
      };
      Categories.put(this.$route.params.id, data).then(
        (res) => {
          if (res.data.status == "success") {
            alert("Cập nhật danh mục sản phẩm thành công");
            this.getCategory();
          } else {
            alert("Cập nhật danh mục sản phẩm thất bại");
          }
          this.isPointer = false;
        },
        (err) => {
          this.isPointer = false;
          this.err = err.response.data.errors;
          console.log(err);
        }
      );
    },
  },
};
</script>

<style>
</style>