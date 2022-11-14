<template>
  <div class="d-sm-flex align-items-center justify-content-between mb-4">
    <h1 class="h3 mb-0 text-gray-800">Danh sách đơn hàng</h1>
  </div>
  <form
    class="form_list_search"
    action=""
    method="get"
    @submit.prevent="search()"
  >
    <div class="input-group">
      <input
        type="text"
        class="form-control small"
        placeholder="Tìm kiếm..."
        aria-label="Search"
        aria-describedby="basic-addon2"
        name="name"
        v-model="name"
      />
      <div class="input-group-append">
        <button class="btn btn-primary" type="submit">
          <i class="fas fa-search fa-sm"></i>
        </button>
      </div>
    </div>
  </form>

  <table class="table table-bordered">
    <thead>
      <tr>
        <th width="5%">STT</th>
        <th>Tên khách hàng</th>
        <th>Số điện thoại</th>
        <th>Email</th>
        <th>Ngày đặt hàng</th>
        <th>Trạng thái</th>
        <th width="5%">Xem</th>
        <th width="5%">Xóa</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, value, index) in ListOrders" :key="index">
        <td>{{ value + 1 }}</td>
        <td>{{ item.customer.name }}</td>
        <td>{{ item.customer.phone }}</td>
        <td>{{ item.customer.email }}</td>
        <td>{{ item.customer.created_at }}</td>
        <td>
          <select
            name="select_type"
            id="select_type"
            style="outline: none"
            class="select_type"
            :order_id="item.id"
            @change="changeTypeOrder($event)"
          >
            <option
              v-for="(type, value, idx) in ListType"
              :key="idx"
              :value="value"
              :selected="checkType(value, item.type)"
            >
              {{ type }}
            </option>
          </select>
        </td>
        <td>
          <RouterLink :to="'/orders/view/' + item.id" class="btn btn-warning"
            >Xem</RouterLink
          >
        </td>
        <td>
          <button
            type="button"
            class="btn btn-danger"
            onclick="return confirm('Bạn có chắc chắn xóa ?')"
            :value="item.id"
            @click="delete_order($event)"
          >
            Xóa
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import Orders from "@/repository/ordersAdmin";
export default {
  name: "listorders",
  data() {
    return {
      ListOrders: [],
      ListType: [],
      name: "",
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      Orders.get().then((res) => {
        console.log(res);
        if (res.data.status == "success") {
          this.ListOrders = res.data.data.data;
          this.ListType = res.data.type;
        }
      });
    },
    checkType(val1, val2) {
      if (val1 == val2) {
        return true;
      }
      return false;
    },
    delete_order(e) {
      var id = e.target.value;
      Orders.delete(id).then((res) => {
        console.log(res);
        if (res.data.status == "success") {
          alert("Xóa đơn hàng thành công");
          this.getList();
        } else {
          alert("Xóa đơn hàng thất bại");
        }
      });
    },
    changeTypeOrder(e) {
      var id_order = e.target.getAttribute("order_id");
      var type = e.target.value;
      var data = {
        order: id_order,
        type: type,
      };
      Orders.post(data).then((res) => {
        console.log(res);
        if (res.data.status == "success") {
          alert("Cập nhật trạng thái đơn hàng thành công");
          this.getList();
        } else {
          alert("Cập nhật trạng thái đơn hàng thất bại");
        }
      });
    },
    search() {
      var name = this.name;
      Orders.get("?name=" + name).then((res) => {
        console.log(res);
        if (res.data.status == "success") {
          this.ListOrders = res.data.data.data;
        }
      });
    },
  },
};
</script>

<style>
</style>