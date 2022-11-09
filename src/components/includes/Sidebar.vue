<template>
  <ul
    class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
    id="accordionSidebar"
  >
    <!-- Sidebar - Brand -->
    <RouterLink
      class="sidebar-brand d-flex align-items-center justify-content-center"
      to="/"
    >
      <div class="sidebar-brand-icon rotate-n-15">
        <i class="fas fa-laugh-wink"></i>
      </div>
      <div class="sidebar-brand-text mx-3">Demo_Login</div>
    </RouterLink>

    <!-- Divider -->
    <hr class="sidebar-divider my-0" />

    <!-- Nav Item - Dashboard -->
    <li class="nav-item active">
      <RouterLink class="nav-link" to="/">
        <i class="fas fa-fw fa-tachometer-alt"></i>
        <span>Tổng quan</span></RouterLink
      >
    </li>

    <!-- Divider -->
    <hr class="sidebar-divider" />

    <!-- Heading -->
    <div class="sidebar-heading">Quản trị</div>

    <!-- Nav Item - Pages Collapse Menu -->
    <li class="nav-item">
      <a
        class="nav-link collapsed ad-link"
        data-toggle="collapse"
        @click="show($event)"
        href="#"
      >
        <i class="fas fa-fw fa-cog"></i>
        Người dùng
      </a>
      <div id="collapse_users" class="collapse">
        <div class="bg-white py-2 collapse-inner rounded">
          <RouterLink class="collapse-item" to="/users/list"
            >Danh sách</RouterLink
          >
          <RouterLink class="collapse-item" to="/users/add"
            >Thêm mới</RouterLink
          >
        </div>
      </div>
    </li>
    <li class="nav-item">
      <a
        class="nav-link collapsed ad-link"
        data-toggle="collapse"
        @click="show($event)"
        href="#"
      >
        <i class="fas fa-fw fa-cog"></i>
        Danh mục sản phẩm
      </a>
      <div id="collapse_categories" class="collapse">
        <div class="bg-white py-2 collapse-inner rounded">
          <RouterLink class="collapse-item" to="/categories/list"
            >Danh sách</RouterLink
          >
          <RouterLink class="collapse-item" to="/categories/add"
            >Thêm mới</RouterLink
          >
        </div>
      </div>
    </li>
    <li class="nav-item">
      <a
        class="nav-link collapsed ad-link"
        data-toggle="collapse"
        @click="show($event)"
        href="#"
      >
        <i class="fas fa-fw fa-cog"></i>
        Quản lý sản phẩm
      </a>
      <div id="collapse_products" class="collapse">
        <div class="bg-white py-2 collapse-inner rounded">
          <RouterLink class="collapse-item" to="/products/list"
            >Danh sách</RouterLink
          >
          <RouterLink class="collapse-item" to="/products/add"
            >Thêm mới</RouterLink
          >
        </div>
      </div>
    </li>
    <li class="nav-item">
      <a
        class="nav-link collapsed ad-link"
        data-toggle="collapse"
        @click="show($event)"
        href="#"
      >
        <i class="fas fa-fw fa-cog"></i>
        Quản lý đơn hàng
      </a>
      <div id="collapse_orders" class="collapse">
        <div class="bg-white py-2 collapse-inner rounded">
          <RouterLink class="collapse-item" to="/orders/list"
            >Danh sách</RouterLink
          >
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: "sidebar",
  methods: {
    show(e) {
      let class_show = e.target.parentElement.children;
      class_show[1].classList.toggle("show");
    },
  },
};
</script>

<style scoped>
.ad-link {
  font-size: 15px;
  font-weight: 400;
}
</style>