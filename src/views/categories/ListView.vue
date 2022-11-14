<template>
  <div class="d-sm-flex align-items-center justify-content-between mb-4">
    <h1 class="h3 mb-0 text-gray-800">Danh mục sản phẩm</h1>
  </div>
  <form
    class="form_list_search"
    action=""
    method="get"
    @submit.prevent="search()"
  >
    <div class="input-group">
      <input
        type="text"
        class="form-control small"
        placeholder="Tìm kiếm..."
        aria-label="Search"
        aria-describedby="basic-addon2"
        name="name"
        v-model="name"
      />
      <div class="input-group-append">
        <button class="btn btn-primary" type="submit">
          <i class="fas fa-search fa-sm"></i>
        </button>
      </div>
    </div>
  </form>

  <p>
    <RouterLink to="/categories/add" class="btn btn-primary"
      >Thêm mới</RouterLink
    >
  </p>
  <table class="table table-bordered">
    <thead>
      <tr>
        <th width="5%">STT</th>
        <th>Tên danh mục</th>
        <th width="10%">Sửa</th>
        <th width="10%">Xóa</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(category, value, index) in ListCategories" :key="index">
        <td>{{ value + 1 }}</td>
        <td>{{ category.name }}</td>
        <td>
          <RouterLink
            :to="'/categories/edit/' + category.id"
            class="btn btn-warning"
            >Sửa</RouterLink
          >
        </td>
        <td>
          <button
            type="button"
            class="btn btn-danger"
            onclick="return confirm('Bạn có chắc chắn xóa ?')"
            :value="category.id"
            @click="delete_category($event)"
          >
            Xóa
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "listcategories",
  data() {
    return {
      ListCategories: [],
      name: "",
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.$request
        .get(import.meta.env.VITE_API_URL + "categories/")
        .then((res) => {
          if (res.data.status == "success") {
            this.ListCategories = res.data.data.data;
          }
        });
    },
    delete_category(e) {
      this.$request({
        method: "delete",
        url: import.meta.env.VITE_API_URL + "categories/" + e.target.value,
        data: {
          id: e.target.value,
        },
      }).then((res) => {
        console.log(res);
        if (res.data.status == "success") {
          alert("Xóa danh mục sản phẩm thành công");
          this.getList();
        } else {
          alert("Xóa danh mục sản phẩm thất bại");
        }
      });
    },
    search() {
      var name = this.name;
      this.$request
        .get(import.meta.env.VITE_API_URL + "categories?name=" + name)
        .then((res) => {
          console.log(res);
          if (res.data.status == "success") {
            this.ListCategories = res.data.data.data;
          }
        });
    },
  },
};
</script>

<style>
</style>