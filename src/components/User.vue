<template>
  <Form @submit="save()" :validation-schema="schema">
    <inputCpn
      label="Tên"
      name="name"
      type="text"
      placeholder="Tên.."
      :value="user.name"
      :err="err.name ? err.name[0] : ''"
      @input="chageValue"
    />
    <inputCpn
      label="Email"
      name="email"
      type="text"
      placeholder="Email...."
      :value="user.email"
      :err="err.email ? err.email[0] : ''"
      @input="chageValue"
    />
    <inputCpn
      label="Mật khẩu(Không nhập nếu không đổi)"
      name="password"
      type="password"
      placeholder="Password...."
      :value="user.password"
      :err="err.password ? err.password[0] : ''"
      @input="chageValue"
    />
    <selectCpn
      label="Chức vụ"
      name="role"
      placeholder="Chọn chức vụ"
      @input="chageValue"
      :err="err.role ? err.role[0] : ''"
      :value="user.role"
      :arrSelect="arrRole"
    />
    <selectCpn
      label="Kích hoạt"
      name="email_verified_at"
      placeholder="Chọn kích hoạt"
      @input="chageValue"
      :err="err.email_verified_at ? err.email_verified_at[0] : ''"
      :value="user.email_verified_at"
      :arrSelect="arrVerify"
    />
    <button
      class="btn btn-primary"
      :class="{ pointer: isPointer }"
      type="submit"
    >
      {{ title }}
    </button>
  </Form>
</template>

<script>
import inputCpn from "./common/InputCpn.vue";
import selectCpn from "./common/SelectCpn.vue";
import { Form } from "vee-validate";
export default {
  name: "cpnuser",
  data() {
    return {
      arrRole: {
        nomal: "Người dùng",
        admin: "Admin",
      },
      arrVerify: {
        0: "Không kích hoạt",
        1: "Kích hoạt",
      },
    };
  },
  props: {
    isPointer: {
      type: Boolean,
      required: false,
      default: false,
    },
    err: {
      type: Array,
      required: false,
      default: [],
    },
    user: {
      type: Array,
      required: false,
      default: [],
    },
    schema: {
      type: Array,
      required: false,
      default: [],
    },
    title: {
      type: String,
      required: false,
      default: "",
    },
  },
  components: {
    Form,
    inputCpn,
    selectCpn,
  },
  methods: {
    save() {
      this.$emit("changeUser", this.user);
    },
    chageValue(val, name) {
      this.user[name] = val;
    },
  },
};
</script>

<style>
</style>