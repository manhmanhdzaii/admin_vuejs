<template>
  <div class="d-sm-flex align-items-center justify-content-between mb-4">
    <h1 class="h3 mb-0 text-gray-800">Danh sách đơn hàng</h1>
  </div>
  <p>
    <RouterLink to="/orders/list" class="btn btn-primary">Quay lại</RouterLink>
  </p>
  <table class="table table-bordered">
    <thead>
      <tr>
        <th width="5%">STT</th>
        <th>Tên sản phẩm</th>
        <th>Giá sản phẩm</th>
        <th>Số lượng</th>
        <th>Tổng tiền</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, key, index) in ListProducts" :key="index">
        <td>{{ key + 1 }}</td>
        <td>{{ item.product.name }}</td>
        <td>{{ item.price }} $</td>
        <td>{{ item.amount }}</td>
        <td>{{ item.amount * item.price }} $</td>
      </tr>

      <tr>
        <td colspan="4">Tổng thanh toán</td>
        <td>{{ total }} $</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "vieworder",
  data() {
    return {
      ListProducts: [],
    };
  },
  created() {
    this.getList();
  },
  computed: {
    total() {
      var total = 0;
      this.ListProducts.forEach((element) => {
        total += element.price * element.amount;
        console.log(total);
      });
      return total;
    },
  },
  methods: {
    getList() {
      this.$request
        .get("http://127.0.0.1:8000/api/ordersAdmin/" + this.$route.params.id)
        .then((res) => {
          console.log(res);
          if (res.data.status == "success") {
            this.ListProducts = res.data.data.data;
          } else {
            alert("Có lỗi xảy ra");
            this.$router.push("/orders/list");
          }
        });
    },
  },
};
</script>

<style>
</style>