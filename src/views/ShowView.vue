<template>
  <div class="d-sm-flex align-items-center justify-content-between mb-4">
    <h1 class="h3 mb-0 text-gray-800">Thông tin cá nhân</h1>
  </div>
  <Form @submit="save()" :validation-schema="schema">
    <inputCpn
      label="Tên"
      name="name"
      type="text"
      placeholder="Tên.."
      :value="user.name"
      :err="sub_err.name ? sub_err.name[0] : ''"
      @input="chageValue"
    />
    <inputCpn
      label="Email"
      name="email"
      type="text"
      placeholder="Email...."
      :value="user.email"
      :err="sub_err.email ? sub_err.email[0] : ''"
      @input="chageValue"
    />
    <inputCpn
      label="Mật khẩu(Không nhập nếu không đổi)"
      name="password"
      type="password"
      placeholder="Password...."
      :err="sub_err.password ? sub_err.password[0] : ''"
      @input="chageValue"
    />
    <selectCpn
      label="Chức vụ"
      name="role"
      disabled="true"
      placeholder="Chọn chức vụ"
      @input="chageValue"
      :err="sub_err.role ? sub_err.role[0] : ''"
      :value="user.role"
      :arrSelect="arrRole"
    />
    <selectCpn
      label="Kích hoạt"
      name="email_verified_at"
      placeholder="Chọn kích hoạt"
      @input="chageValue"
      :err="sub_err.email_verified_at ? sub_err.email_verified_at[0] : ''"
      :value="user.email_verified_at"
      :arrSelect="arrVerify"
    />
    <button class="btn btn-primary" type="submit">Cập nhật</button>
  </Form>
</template>

<script>
import infoUser from "@/repository/infoUser";
import inputCpn from "@/components/common/InputCpn.vue";
import selectCpn from "@/components/common/SelectCpn.vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
  name: "edituser",
  data() {
    return {
      user: [],
      sub_err: [],
      email_verified_at: "",
      arrRole: {
        nomal: "Người dùng",
        admin: "Admin",
      },
      arrVerify: {
        0: "Không kích hoạt",
        1: "Kích hoạt",
      },
      isPointer: false,
      favorite: "tea",
    };
  },
  created() {
    this.getUser();
  },
  components: {
    Form,
    inputCpn,
    selectCpn,
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
      infoUser.get().then((res) => {
        console.log(res.data.data);
        this.user = res.data.data;
        this.user.email_verified_at = res.data.data.email_verified_at ? 1 : 0;
        this.$store.commit("change_name", res.data.data.name);
      });
    },
    save() {
      this.isPointer = true;
      let name = this.user.name;
      let email = this.user.email;
      let password = this.user.password;
      let role = this.user.role;
      let email_verified_at = this.user.email_verified_at;
      var data = {
        name: name,
        email: email,
        password: password,
        role: role,
        email_verified_at: email_verified_at,
      };
      infoUser.put(data).then(
        (res) => {
          if (res.data.status == "success") {
            alert("Cập nhật người dùng thành công");
            this.getUser();
          } else {
            alert("Có lỗi xảy ra");
          }
        },
        (err) => {
          this.isPointer = false;
          this.sub_err = err.response.data.errors;
          console.log(err);
        }
      );
    },
    chageValue(val, name) {
      this.user[name] = val;
    },
  },
};
</script>

<style>
</style>