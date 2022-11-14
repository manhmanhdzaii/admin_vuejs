<template>
  <div class="d-sm-flex align-items-center justify-content-between mb-4">
    <h1 class="h3 mb-0 text-gray-800">Thông tin cá nhân</h1>
  </div>
  <Form @submit="save()" :validation-schema="schema">
    <div class="mb-3">
      <label for="">Tên</label>
      <Field
        name="name"
        id="name"
        type="text"
        class="form-control"
        placeholder="Tên...."
        v-model="user.name"
      />
      <span style="color: red" v-if="sub_err.name">
        {{ sub_err.name[0] }}
      </span>
      <ErrorMessage style="color: red" name="name" />
    </div>
    <div class="mb-3">
      <label for="">Email</label>
      <Field
        name="email"
        id="email"
        type="text"
        class="form-control"
        placeholder="Email...."
        v-model="user.email"
      />
      <span style="color: red" v-if="sub_err.email">
        {{ sub_err.email[0] }}
      </span>
      <ErrorMessage style="color: red" name="email" />
    </div>
    <div class="mb-3">
      <label for="">Mật khẩu(Không nhập nếu không đổi)</label>
      <Field
        name="password"
        id="password"
        type="password"
        class="form-control"
        placeholder="Password...."
      />
      <span style="color: red" v-if="sub_err.password">
        {{ sub_err.password[0] }}
      </span>
    </div>
    <div class="mb-3">
      <label for="">Chức vụ</label>
      <Field
        as="select"
        name="role"
        class="form-control"
        id="role"
        v-model="user.role"
        disabled
      >
        <option value="">Chọn chức vụ</option>
        <option value="nomal">Người dùng</option>
        <option value="admin">Admin</option>
      </Field>
      <span style="color: red" v-if="sub_err.role">
        {{ sub_err.role[0] }}
      </span>
      <ErrorMessage style="color: red" name="role" />
    </div>
    <div class="mb-3">
      <label for="">Kích hoạt</label>
      <Field
        as="select"
        name="email_verified_at"
        class="form-control"
        id="email_verified_at"
        v-model="email_verified_at"
      >
        <option value="">Chọn kích hoạt</option>
        <option value="0">Không kích hoạt</option>
        <option value="1">Kích hoạt</option>
      </Field>
      <span style="color: red" v-if="sub_err.email_verified_at">
        {{ sub_err.email_verified_at[0] }}
      </span>
      <ErrorMessage style="color: red" name="email_verified_at" />
    </div>
    <button class="btn btn-primary" type="submit">Cập nhật</button>
  </Form>
</template>

<script>
import infoUser from "../repository/infoUser";
import { Form, Field, ErrorMessage } from "vee-validate";
import axiosInstances from "../repository/axios";
import * as yup from "yup";
export default {
  name: "edituser",
  data() {
    return {
      user: [],
      sub_err: [],
      email_verified_at: "",
      isPointer: false,
      favorite: "tea",
    };
  },
  created() {
    this.getUser();
  },
  components: {
    Form,
    Field,
    ErrorMessage,
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
        this.email_verified_at = res.data.data.email_verified_at ? 1 : 0;
        this.$store.commit("change_name", res.data.data.name);
      });
    },
    save() {
      this.isPointer = true;
      let name = document.querySelector("#name").value;
      let email = document.querySelector("#email").value;
      let password = document.querySelector("#password").value;
      let role = document.querySelector("#role").value;
      let email_verified_at =
        document.querySelector("#email_verified_at").value;
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
  },
};
</script>

<style>
</style>