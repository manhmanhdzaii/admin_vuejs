<template>
  <div class="d-sm-flex align-items-center justify-content-between mb-4">
    <h1 class="h3 mb-0 text-gray-800">Thêm danh mục sản phẩm</h1>
  </div>
  <form action="" method="post" @submit.prevent="save()">
    <div class="mb-3">
      <label for="">Tên danh mục</label>
      <input
        name="name"
        type="text"
        class="form-control"
        placeholder="Nhập tên danh mục...."
        v-model="category.name"
      />
      <span style="color: red" v-if="err.name"> {{ err.name[0] }} </span>
    </div>
    <button class="btn btn-primary" type="submit">Thêm mới</button>
  </form>
</template>

<script>
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
  methods: {
    save() {
      this.isPointer = true;
      this.$request({
        method: "post",
        url: "http://127.0.0.1:8000/api/categories/",
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