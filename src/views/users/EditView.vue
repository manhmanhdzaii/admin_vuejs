<template>
  <div class="d-sm-flex align-items-center justify-content-between mb-4">
    <h1 class="h3 mb-0 text-gray-800">Sửa người dùng</h1>
  </div>
  <usercpn
    :isPointer="isPointer"
    @changeUser="save"
    :err="err"
    :user="user"
    :schema="schema"
    :title="title"
  />
</template>

<script>
import * as yup from "yup";
import UserCpm from "../../components/User.vue";
export default {
  name: "edituser",
  data() {
    return {
      user: [],
      err: [],
      isPointer: false,
      title: "Cập nhật",
    };
  },
  created() {
    this.getUser();
  },
  components: {
    usercpn: UserCpm,
  },
  computed: {
    schema() {
      return yup.object({
        name: yup.string().required().label("Name"),
        email: yup.string().required().email().label("Email"),
        role: yup.string().required().label("Role"),
        email_verified_at: yup.string().required().label("Email verified"),
      });
    },
  },
  methods: {
    getUser() {
      this.$request
        .get(import.meta.env.VITE_API_URL + "users/" + this.$route.params.id)
        .then((res) => {
          this.user = res.data.data;
          this.user.email_verified_at = res.data.data.email_verified_at ? 1 : 0;
        });
    },
    save(user) {
      this.isPointer = true;
      this.$request({
        method: "put",
        url: import.meta.env.VITE_API_URL + "users/" + this.$route.params.id,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          name: user.name,
          email: user.email,
          password: user.password,
          role: user.role,
          email_verified_at: user.email_verified_at,
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