<template>
  <Form @submit="save()" :validation-schema="schema">
    <div class="mb-3">
      <label for="">Tên</label>
      <Field
        name="name"
        type="text"
        class="form-control"
        placeholder="Tên...."
        v-model="user.name"
      />
      <span style="color: red" v-if="err.name"> {{ err.name[0] }} </span>
      <ErrorMessage style="color: red" name="name" />
    </div>
    <div class="mb-3">
      <label for="">Email</label>
      <Field
        name="email"
        type="text"
        class="form-control"
        placeholder="Email...."
        v-model="user.email"
      />
      <span style="color: red" v-if="err.email"> {{ err.email[0] }} </span>
      <ErrorMessage style="color: red" name="email" />
    </div>
    <div class="mb-3">
      <label for="">Mật khẩu</label>
      <Field
        name="password"
        type="password"
        class="form-control"
        placeholder="Password...."
        v-model="user.password"
      />
      <span style="color: red" v-if="err.password">
        {{ err.password[0] }}
      </span>
      <ErrorMessage style="color: red" name="password" />
    </div>
    <div class="mb-3">
      <label for="">Chức vụ</label>
      <Field
        as="select"
        name="role"
        class="form-control"
        id="role"
        v-model="user.role"
      >
        <option value="">Chọn chức vụ</option>
        <option value="nomal">Người dùng</option>
        <option value="admin">Admin</option>
      </Field>
      <span style="color: red" v-if="err.role"> {{ err.role[0] }} </span>
      <ErrorMessage style="color: red" name="role" />
    </div>
    <div class="mb-3">
      <label for="">Kích hoạt</label>
      <Field
        as="select"
        name="email_verified_at"
        class="form-control"
        id="email_verified_at"
        v-model="user.email_verified_at"
      >
        <option value="">Chọn kích hoạt</option>
        <option value="0">Không kích hoạt</option>
        <option value="1">Kích hoạt</option>
      </Field>
      <span style="color: red" v-if="err.email_verified_at">
        {{ err.email_verified_at[0] }}
      </span>
      <ErrorMessage style="color: red" name="email_verified_at" />
    </div>
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
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
  name: "cpnuser",
  data() {
    return {};
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
    Field,
    ErrorMessage,
  },
  methods: {
    save() {
      this.$emit("changeUser", this.user);
    },
  },
};
</script>

<style>
</style>