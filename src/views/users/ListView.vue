<template>
  <div class="d-sm-flex align-items-center justify-content-between mb-4">
    <h1 class="h3 mb-0 text-gray-800">Danh sách người dùng</h1>
  </div>
  <!-- <div class="alert alert-success">
</div>
<div class="alert alert-danger">
</div> -->

  <p>
    <RouterLink to="/users/add" class="btn btn-primary">Thêm mới</RouterLink>
  </p>
  <table class="table table-bordered">
    <thead>
      <tr>
        <th width="5%">STT</th>
        <th>Tên</th>
        <th>Email</th>
        <th>Role</th>
        <th>Active</th>
        <th width="5%">Sửa</th>
        <th width="5%">Xóa</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in ListUser" :key="index">
        <td>{{ index + 1 }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.email }}</td>
        <td>{{ item.role }}</td>
        <td>
          {{ item.email_verified_at ? "Đã kích hoạt" : "Chưa kích hoạt" }}
        </td>
        <td>
          <RouterLink
            :to="'/users/edit/' + item.id"
            class="btn btn-warning"
            :value="item.id"
          >
            Sửa
          </RouterLink>
        </td>
        <td>
          <button
            type="button"
            class="btn btn-danger"
            onclick="return confirm('Bạn có chắc chắn xóa ?')"
            :value="item.id"
            @click="delete_user($event)"
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
  name: "listuser",
  data() {
    return {
      ListUser: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.$request.get("http://127.0.0.1:8000/api/users/").then((res) => {
        if (res.data.status == "success") {
          console.log(res);
          this.ListUser = res.data.data;
        }
      });
    },
    delete_user(e) {
      this.$request({
        method: "delete",
        url: "http://127.0.0.1:8000/api/users/" + e.target.value,
        data: {
          id: e.target.value,
        },
      }).then((res) => {
        if (res.data.status == "success") {
          alert("Xóa người dùng thành công");
          this.getList();
        } else {
          alert("Xóa người dùng thất bại");
        }
      });
    },
  },
};
</script>

<style>
</style>