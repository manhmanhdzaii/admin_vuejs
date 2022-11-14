<template>
  <div class="d-sm-flex align-items-center justify-content-between mb-4">
    <h1 class="h3 mb-0 text-gray-800">Thêm người dùng</h1>
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
import Users from "@/repository/users";
import * as yup from "yup";
import UserCpm from "@/components/User.vue";
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
      title: "Thêm mới",
    };
  },
  components: {
    usercpn: UserCpm,
  },
  computed: {
    schema() {
      return yup.object({
        name: yup.string().required().label("Name"),
        email: yup.string().required().email().label("Email"),
        password: yup.string().required().label("Password"),
        role: yup.string().required().label("Role"),
        email_verified_at: yup.string().required().label("Email verified"),
      });
    },
  },
  methods: {
    save(user) {
      this.isPointer = true;
      var data = {
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
        email_verified_at: user.email_verified_at,
      };
      Users.post(data).then(
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