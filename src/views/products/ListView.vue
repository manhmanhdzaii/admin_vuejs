<template>
  <div class="d-sm-flex align-items-center justify-content-between mb-4">
    <h1 class="h3 mb-0 text-gray-800">Danh sách danh mục sản phẩm</h1>
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
    <RouterLink to="/products/add" tag="a" class="btn btn-primary">
      Thêm mới</RouterLink
    >
  </p>
  <table class="table table-bordered">
    <thead>
      <tr>
        <th width="5%">STT</th>
        <th>Tên sp</th>
        <th>Giá sp</th>
        <th>Hình ảnh</th>
        <th>Danh mục</th>
        <th width="5%">Sửa</th>
        <th width="5%">Xóa</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(list, value, index) in ListProducts" :key="index">
        <td>{{ value + 1 }}</td>
        <td>{{ list.name }}</td>
        <td>{{ list.price }}</td>
        <td class="text-center">
          <img
            style="width: 100px"
            :src="'http://127.0.0.1:8000/' + list.img"
          />
        </td>
        <td>{{ list.category.name }}</td>
        <td>
          <RouterLink :to="'/products/edit/' + list.id" class="btn btn-warning"
            >Sửa</RouterLink
          >
        </td>
        <td>
          <button
            type="button"
            class="btn btn-danger"
            onclick="return confirm('Bạn có chắc chắn xóa ?')"
            :value="list.id"
            @click="delete_products($event)"
          >
            Xóa
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <pagination
    :totalPages="pagination.totalPages"
    :total="pagination.total"
    :perPage="pagination.perPage"
    :current-page="pagination.currentPage"
    @pagechanged="onPageChange"
  />
</template>

<script>
import cpnPagination from "../../components/includes/Pagination.vue";
export default {
  name: "listproducts",
  data() {
    return {
      ListProducts: [],
      name: "",
      pagination: {
        currentPage: "",
        totalPages: "",
        total: "",
        perPage: "",
      },
    };
  },
  components: {
    pagination: cpnPagination,
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.$request.get("http://127.0.0.1:8000/api/products/").then((res) => {
        console.log(res);
        if (res.data.status == "success") {
          this.ListProducts = res.data.data.data;
          this.pagination.currentPage = res.data.data.current_page;
          this.pagination.totalPages = res.data.data.last_page;
          this.pagination.total = res.data.data.total;
          this.pagination.perPage = res.data.data.per_page;
        }
      });
    },
    onPageChange(page) {
      this.pagination.currentPage = page;
      this.$request
        .get("http://127.0.0.1:8000/api/products?page=" + page)
        .then((res) => {
          console.log(res);
          if (res.data.status == "success") {
            this.ListProducts = res.data.data.data;
            this.pagination.currentPage = res.data.data.current_page;
            this.pagination.totalPages = res.data.data.last_page;
            this.pagination.total = res.data.data.total;
            this.pagination.perPage = res.data.data.per_page;
          }
        });
    },
    search() {
      var name = this.name;
      this.$request
        .get("http://127.0.0.1:8000/api/products?name=" + name)
        .then((res) => {
          console.log(res);
          if (res.data.status == "success") {
            this.ListProducts = res.data.data.data;
            this.pagination.currentPage = res.data.data.current_page;
            this.pagination.totalPages = res.data.data.last_page;
            this.pagination.total = res.data.data.total;
            this.pagination.perPage = res.data.data.per_page;
          }
        });
    },
    delete_products(e) {
      this.$request({
        method: "delete",
        url: "http://127.0.0.1:8000/api/products/" + e.target.value,
        data: {
          id: e.target.value,
        },
      }).then((res) => {
        console.log(res);
        if (res.data.status == "success") {
          alert("Xóa sản phẩm thành công");
          this.getList();
        } else {
          alert("Xóa sản phẩm thất bại");
        }
      });
    },
  },
};
</script>

<style>
</style>