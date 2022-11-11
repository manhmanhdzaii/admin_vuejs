<template>
  <form
    action=""
    method="post"
    class="login_form"
    enctype="multipart/form-data"
    @submit.prevent="save()"
  >
    <div class="d_flex">
      <p class="min_w_100">Email</p>
      <div class="div">
        <input
          type="text"
          placeholder="Nhập email.."
          class="box_input"
          name="user_name"
          v-model="data.email"
        />
        <p class="err">
          <span v-if="err.email">{{ err.email[0] }}</span>
        </p>
      </div>
    </div>
    <div class="d_flex">
      <p class="min_w_100">Mật khẩu</p>
      <div class="div">
        <input
          type="password"
          placeholder="Nhập mật khẩu.."
          class="box_input"
          name="password"
          v-model="data.password"
        />
        <p class="err">
          <span v-if="err.password">{{ err.password[0] }}</span>
        </p>
      </div>
    </div>
    <div class="d_flex">
      <p class="min_w_100">Mật khẩu</p>
      <div class="div">
        <input
          type="password"
          placeholder="Nhập lại mật khẩu..."
          class="box_input"
          name="re_password"
          v-model="data.password_confirmation"
        />
        <p class="err">
          <span v-if="err.password_confirmation">{{
            err.password_confirmation[0]
          }}</span>
        </p>
      </div>
    </div>
    <div class="box_login">
      <input
        type="submit"
        value="Gửi"
        class="login_submit"
        :class="{ pointer: isPointer }"
      />
    </div>
  </form>
</template>

<script>
export default {
  name: "resetpass",
  data() {
    return {
      data: {
        email: "",
        password: "",
        password_confirmation: "",
      },
      err: [],
      isPointer: false,
    };
  },
  created() {
    this.data.email = this.$route.query.email;
  },
  methods: {
    save() {
      this.isPointer = true;
      this.$request({
        method: "post",
        url: "http://127.0.0.1:8000/api/reset-password",
        data: {
          email: this.data.email,
          password: this.data.password,
          password_confirmation: this.data.password_confirmation,
          token: this.$route.params.token,
        },
      }).then(
        (res) => {
          console.log(res);
          alert(res.data.content);
          if (res.data.status == "success") {
            this.$router.push("/login");
          } else {
            this.isPointer = false;
          }
        },
        (err) => {
          this.isPointer = false;
          this.err = err.response.data.errors;
          console.log(err.response.data.errors);
        }
      );
    },
  },
};
</script>

<style scoped>
.box_head {
  text-align: right;
}
.link_head {
  margin-right: 10%;
  text-align: right;
}
.login_form {
  width: max-content;
  display: block;
  margin: 100px auto;
}
.d_flex {
  display: flex;
}
.min_w_100 {
  min-width: 150px;
}
.box_input {
  width: 300px;
  margin: 0px 0px 0px 20px;
  height: 34px;
  padding: 0px 10px;
}
.err {
  color: red;
  font-size: 12px;
  height: 20px;
  margin: 0;
  padding-left: 20px;
}
.ip_submit {
  padding: 10px 40px;
  display: block;
  margin: 30px auto;
  background: blue;
  color: white;
  border: none;
}
.success {
  width: 100%;
  background: blue;
  text-align: center;
  padding: 10px;
  color: white;
  font-size: 18px;
}
.box_login {
  display: flex;
  align-items: center;
  justify-content: center;
}
.login_submit {
  margin-top: 20px;
  padding: 10px 40px;
  display: block;
  background: blue;
  color: white;
  border: none;
}
.pointer {
  pointer-events: none;
}
</style>
