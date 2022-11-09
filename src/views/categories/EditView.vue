<template>
  <div class="d-sm-flex align-items-center justify-content-between mb-4">
    <h1 class="h3 mb-0 text-gray-800">Sửa danh mục sản phẩm</h1>
  </div>
  <form action="" method="post" @submit.prevent="save()">
    <div class="mb-3">
      <label for="">Tên danh mục</label>
      <input
        name="name"
        type="text"
        class="form-control"
        placeholder="Nhập tên danh mục...."
        id="name"
        :value="category.name"
      />
      <span style="color: red" v-if="err.name"> {{ err.name[0] }} </span>
    </div>
    <button class="btn btn-primary" type="submit">Cập nhật</button>
  </form>
</template>

<script>
export default {
  name: "editcategories",
  data() {
    return {
      category: [],
      err: [],
      isPointer: false,
    };
  },
  created() {
    this.getCategory();
  },
  methods: {
    getCategory() {
      this.$request
        .get("http://127.0.0.1:8000/api/categories/" + this.$route.params.id)
        .then((res) => {
          if (res.data.status == "success") {
            this.category = res.data.data;
          } else {
            alert("có lỗi xảy ra");
            this.$router.push("/categories/list");
          }
        });
    },
    save() {
      this.isPointer = true;
      let name = document.querySelector("#name").value;
      this.$request({
        method: "put",
        url: "http://127.0.0.1:8000/api/categories/" + this.$route.params.id,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          name: name,
        },
      }).then(
        (res) => {
          if (res.data.status == "success") {
            alert("Cập nhật danh mục sản phẩm thành công");
            this.getCategory();
          } else {
            alert("Cập nhật danh mục sản phẩm thất bại");
          }
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