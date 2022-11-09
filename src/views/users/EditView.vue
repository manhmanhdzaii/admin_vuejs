<template>
  <div class="d-sm-flex align-items-center justify-content-between mb-4">
    <h1 class="h3 mb-0 text-gray-800">Sửa người dùng</h1>
  </div>
  <form action="" method="put" @submit.prevent="save()">
    <div class="mb-3">
      <label for="">Tên</label>
      <input
        name="name"
        id="name"
        type="text"
        class="form-control"
        placeholder="Tên...."
        :value="user.name"
      />
      <span style="color: red" v-if="err.name"> {{ err.name[0] }} </span>
    </div>
    <div class="mb-3">
      <label for="">Email</label>
      <input
        name="email"
        id="email"
        type="text"
        class="form-control"
        placeholder="Email...."
        :value="user.email"
      />
      <span style="color: red" v-if="err.email"> {{ err.email[0] }} </span>
    </div>
    <div class="mb-3">
      <label for="">Mật khẩu(Không nhập nếu không đổi)</label>
      <input
        name="password"
        id="password"
        type="password"
        class="form-control"
        placeholder="Password...."
      />
      <span style="color: red" v-if="err.password">
        {{ err.password[0] }}
      </span>
    </div>
    <div class="mb-3">
      <label for="">Chức vụ</label>
      <select name="role" class="form-control" id="role">
        <option value="">Chọn chức vụ</option>
        <option value="nomal" :selected="checkVal(user.role, 'nomal')">
          Người dùng
        </option>
        <option value="admin" :selected="checkVal(user.role, 'admin')">
          Admin
        </option>
      </select>
      <span style="color: red" v-if="err.role"> {{ err.role[0] }} </span>
    </div>
    <div class="mb-3">
      <label for="">Kích hoạt</label>
      <select
        name="email_verified_at"
        class="form-control"
        id="email_verified_at"
      >
        <option value="">Chọn kích hoạt</option>
        <option value="0" :selected="checkVerified(user.email_verified_at, 0)">
          Không kích hoạt
        </option>
        <option value="1" :selected="checkVerified(user.email_verified_at, 1)">
          Kích hoạt
        </option>
      </select>
      <span style="color: red" v-if="err.email_verified_at">
        {{ err.email_verified_at[0] }}
      </span>
    </div>
    <button class="btn btn-primary" type="submit">Cập nhật</button>
  </form>
</template>

<script>
export default {
  name: "edituser",
  data() {
    return {
      user: [],
      err: [],
      isPointer: false,
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      this.$request
        .get("http://127.0.0.1:8000/api/users/" + this.$route.params.id)
        .then((res) => {
          this.user = res.data.data;
        });
    },
    checkVal(val1, val2) {
      if (val1 == val2) {
        return true;
      }
      return false;
    },
    checkVerified(val, num) {
      if (num == 0) {
        if (val) {
          return false;
        }
        return true;
      }
      if (num == 1) {
        if (val) {
          return true;
        }
        return false;
      }
    },
    save() {
      this.isPointer = true;
      let name = document.querySelector("#name").value;
      let email = document.querySelector("#email").value;
      let password = document.querySelector("#password").value;
      let role = document.querySelector("#role").value;
      let email_verified_at =
        document.querySelector("#email_verified_at").value;
      this.$request({
        method: "put",
        url: "http://127.0.0.1:8000/api/users/" + this.$route.params.id,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          name: name,
          email: email,
          password: password,
          role: role,
          email_verified_at: email_verified_at,
        },
      }).then(
        (res) => {
          if (res.data.status == "success") {
            alert("Cập nhật người dùng thành công");
            this.getUser();
          } else {
            alert("Có lỗi xảy ra");
            this.$router.push("/users/list");
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