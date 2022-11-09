<script setup>
import cpnSideBar from "./components/includes/Sidebar.vue";
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div id="wrapper">
    <cpnSideBar />
    <div id="content-wrapper" class="d-flex flex-column">
      <!-- Main Content -->
      <div id="content">
        <nav
          class="
            navbar navbar-expand navbar-light
            bg-white
            topbar
            mb-4
            static-top
            shadow
          "
        >
          <!-- Topbar Search -->
          <form
            class="
              d-none d-sm-inline-block
              form-inline
              mr-auto
              ml-md-3
              my-2 my-md-0
              mw-100
              navbar-search
            "
          >
            <div class="input-group">
              <input
                type="text"
                class="form-control bg-light border-0 small"
                placeholder="Search for..."
                aria-label="Search"
                aria-describedby="basic-addon2"
              />
              <div class="input-group-append">
                <button class="btn btn-primary" type="button">
                  <i class="fas fa-search fa-sm"></i>
                </button>
              </div>
            </div>
          </form>

          <!-- Topbar Navbar -->
          <ul class="navbar-nav ml-auto">
            <!-- Nav Item - Search Dropdown (Visible Only XS) -->
            <li class="nav-item dropdown no-arrow d-sm-none">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="searchDropdown"
                role="button"
              >
                <i class="fas fa-search fa-fw"></i>
              </a>
              <!-- Dropdown - Messages -->
            </li>

            <!-- Nav Item - Alerts -->
            <li class="nav-item dropdown no-arrow mx-1">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="alertsDropdown"
                role="button"
                @click="toggle()"
              >
                <i class="fas fa-bell fa-fw"></i>
                <!-- Counter - Alerts -->
                <span class="badge badge-danger badge-counter">3+</span>
              </a>
              <!-- Dropdown - Alerts -->
            </li>

            <!-- Nav Item - Messages -->
            <li class="nav-item dropdown no-arrow mx-1">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="messagesDropdown"
                role="button"
              >
                <i class="fas fa-envelope fa-fw"></i>
                <!-- Counter - Messages -->
                <span class="badge badge-danger badge-counter">7</span>
              </a>
            </li>

            <div class="topbar-divider d-none d-sm-block"></div>

            <!-- Nav Item - User Information -->
            <li
              class="nav-item dropdown no-arrow"
              v-if="this.$store.state.isLogin"
            >
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="userDropdown"
                role="button"
                @click="showInfo()"
              >
                <span class="mr-2 d-none d-lg-inline text-gray-600 small">{{
                  name
                }}</span>
                <img
                  class="img-profile rounded-circle"
                  src="../public/img/undraw_profile.svg"
                />
              </a>
              <!-- Dropdown - User Information -->
              <div
                id="info"
                class="
                  dropdown-menu dropdown-menu-right
                  shadow
                  animated--grow-in
                "
                aria-labelledby="userDropdown"
              >
                <RouterLink class="dropdown-item" to="/users/show">
                  <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                  Cá nhân
                </RouterLink>
                <div class="dropdown-divider"></div>
                <a
                  class="dropdown-item"
                  href="#"
                  data-toggle="modal"
                  data-target="#logoutModal"
                  @click="logout()"
                >
                  <i
                    class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"
                  ></i>
                  Đăng xuất
                </a>
              </div>
            </li>
            <li
              class="
                nav-item
                dropdown
                no-arrow
                d-flex
                align-items-center
                justify-content-center
              "
              v-else
            >
              <RouterLink to="/login">Đăng nhập</RouterLink>
            </li>
          </ul>
        </nav>
        <!-- End of Topbar -->

        <!-- Begin Page Content -->
        <div class="container-fluid">
          <RouterView />
        </div>
        <!-- /.container-fluid -->
      </div>
      <!-- End of Main Content -->

      <!-- Footer -->
      <footer class="sticky-footer bg-white">
        <div class="container my-auto">
          <div class="copyright text-center my-auto">
            <span>Copyright &copy; Your Website 2021</span>
          </div>
        </div>
      </footer>
      <!-- End of Footer -->
    </div>
    <!-- End of Content Wrapper -->
  </div>
  <!-- End of Page Wrapper -->
</template>
<script>
export default {
  data() {
    return {
      token: localStorage.getItem("token"),
      name: localStorage.getItem("name"),
    };
  },
  methods: {
    showInfo() {
      document.getElementById("info").classList.toggle("show");
    },
    logout() {
      localStorage.removeItem("name");
      localStorage.removeItem("token");

      this.$store.commit("is_login", false);
      this.$router.push({ name: "login" });
    },
  },
};
</script>
<style scoped>
</style>
