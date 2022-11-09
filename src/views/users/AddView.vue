<template>
  <div class="d-sm-flex align-items-center justify-content-between mb-4">
    <h1 class="h3 mb-0 text-gray-800">Thêm người dùng</h1>
  </div>

  <form action="" method="post" @submit.prevent="save()">
    <div class="mb-3">
      <label for="">Tên</label>
      <input
        name="name"
        type="text"
        class="form-control"
        placeholder="Tên...."
        v-model="user.name"
      />
      <span style="color: red" v-if="err.name"> {{ err.name[0] }} </span>
    </div>
    <div class="mb-3">
      <label for="">Email</label>
      <input
        name="email"
        type="text"
        class="form-control"
        placeholder="Email...."
        v-model="user.email"
      />
      <span style="color: red" v-if="err.email"> {{ err.email[0] }} </span>
    </div>
    <div class="mb-3">
      <label for="">Mật khẩu</label>
      <input
        name="password"
        type="password"
        class="form-control"
        placeholder="Password...."
        v-model="user.password"
      />
      <span style="color: red" v-if="err.password">
        {{ err.password[0] }}
      </span>
    </div>
    <div class="mb-3">
      <label for="">Chức vụ</label>
      <select name="role" class="form-control" id="role" v-model="user.role">
        <option value="">Chọn chức vụ</option>
        <option value="nomal">Người dùng</option>
        <option value="admin">Admin</option>
      </select>
      <span style="color: red" v-if="err.role"> {{ err.role[0] }} </span>
    </div>
    <div class="mb-3">
      <label for="">Kích hoạt</label>
      <select
        name="email_verified_at"
        class="form-control"
        id="email_verified_at"
        v-model="user.email_verified_at"
      >
        <option value="">Chọn kích hoạt</option>
        <option value="0">Không kích hoạt</option>
        <option value="1">Kích hoạt</option>
      </select>
      <span style="color: red" v-if="err.email_verified_at">
        {{ err.email_verified_at[0] }}
      </span>
    </div>
    <button
      class="btn btn-primary"
      :class="{ pointer: isPointer }"
      type="submit"
    >
      Thêm mới
    </button>
  </form>
</template>

<script>
export default {
  name: "adduser",
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
        role: "",
        email_verified_at: "",
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
        url: "http://127.0.0.1:8000/api/users/",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          name: this.user.name,
          email: this.user.email,
          password: this.user.password,
          role: this.user.role,
          email_verified_at: this.user.email_verified_at,
        },
      }).then(
        (res) => {
          if (res.data.status == "success") {
            alert("Thêm mới người dùng thành công");
            this.$router.push("/users/list");
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

<style scoped>
.pointer {
  pointer-events: none;
}
</style>