<template>
  <div class="d-sm-flex align-items-center justify-content-between mb-4">
    <h1 class="h3 mb-0 text-gray-800">Sửa sản phẩm</h1>
  </div>
  <form
    action=""
    method="post"
    enctype="multipart/form-data"
    @submit.prevent="save()"
  >
    <div class="mb-3">
      <label for="">Tên sản phẩm</label>
      <input
        name="name"
        type="text"
        class="form-control"
        placeholder="Nhập tên sản phẩm...."
        :value="product.name"
      />
      <span style="color: red" v-if="err.name"> {{ err.name[0] }} </span>
    </div>
    <div class="mb-3">
      <label for="">Giá sản phẩm</label>
      <input
        name="price"
        type="number"
        class="form-control"
        placeholder="Nhập giá sản phẩm...."
        :value="product.price"
      />
      <span style="color: red" v-if="err.price"> {{ err.price[0] }} </span>
    </div>
    <div class="mb-3">
      <label for="">Màu sản phẩm</label>
      <select name="color_id[]" id="color_id" class="form-control" multiple>
        <option
          v-for="(color, index) in colors"
          :value="color.id"
          :key="index"
          :selected="checkSelected(color.id, product.color_id)"
        >
          {{ color.name }}
        </option>
      </select>
      <span style="color: red" v-if="err.color_id">
        {{ err.color_id[0] }}
      </span>
    </div>
    <div class="mb-3">
      <label for="">Size sản phẩm </label>
      <select name="size_id[]" id="size_id" class="form-control" multiple>
        <option
          v-for="(size, index) in sizes"
          :value="size.id"
          :key="index"
          :selected="checkSelected(size.id, product.size_id)"
        >
          {{ size.name }}
        </option>
      </select>
      <span style="color: red" v-if="err.size_id">
        {{ err.size_id[0] }}
      </span>
    </div>
    <div class="mb-3">
      <label for="">Danh mục</label>
      <select name="category_id" id="category_id" class="form-control">
        <option value="">Chọn danh mục</option>
        <option
          v-for="(category, index) in categories"
          :value="category.id"
          :key="index"
          :selected="category.id == product.category_id"
        >
          {{ category.name }}
        </option>
      </select>
      <span style="color: red" v-if="err.category_id">
        {{ err.category_id[0] }}
      </span>
    </div>
    <div class="mb-3">
      <label for="">Hình ảnh sản phẩm</label>
      <div class="custom-file">
        <input
          type="file"
          class="form-control"
          id="img"
          name="img"
          @change="loadFile1($event)"
        />
        <label class="custom-file-label" for="img">Choose file</label>
      </div>
      <span style="color: red" v-if="err.img">
        {{ err.img[0] }}
      </span>
    </div>
    <div class="mb-3">
      <div class="img_prew">
        <a class="img_show"
          ><img :src="'http://127.0.0.1:8000/' + product.img" /><i
            class="fas fa-trash delete_imgshow"
            @click="Remove_ImgShow($event)"
          ></i
        ></a>
      </div>
    </div>
    <div class="mb-3">
      <label for="">Hình ảnh kèm theo(tối đa 4)</label>
      <div class="custom-file">
        <input
          type="file"
          class="form-control"
          id="img_sub"
          name="img_sub[]"
          @change="loadFile($event)"
          multiple
        />
        <label class="custom-file-label" for="img_sub">Choose file</label>
      </div>
    </div>
    <div class="mb-3">
      <div class="img_prew_sub">
        <a class="img_show" v-for="(item, idx) in imgs" :key="idx">
          <img :src="'http://127.0.0.1:8000/' + item.path" /><i
            class="fas fa-trash delete_imgshow"
            @click="Remove_ImgShow($event)"
          ></i
        ></a>
      </div>
    </div>
    <div class="mb-3">
      <label for="">Mô tả chi tiết</label>
      <textarea
        name="description"
        id="description"
        class="form-control"
        v-model="productdes"
      ></textarea>
      <span style="color: red" v-if="err.description">
        {{ err.description[0] }}
      </span>
    </div>

    <button class="btn btn-primary" type="submit">Cập nhật</button>
  </form>
</template>

<script>
import Products from "../../repository/products";
import Categories from "../../repository/categories";
import Sizes from "../../repository/sizes";
import Colors from "../../repository/colors";
export default {
  name: "editproduct",
  data() {
    return {
      colors: [],
      sizes: [],
      categories: [],
      err: [],
      product: [],
      imgs: [],
      productdes: "",
    };
  },
  created() {
    this.getColors();
    this.getSize();
    this.getCategories();
    this.getProduct();
  },
  methods: {
    getColors() {
      Colors.get().then((res) => {
        this.colors = res.data.data;
      });
    },
    getSize() {
      this.$request.get(import.meta.env.VITE_API_URL + "sizes").then((res) => {
        this.sizes = res.data.data;
      });
    },
    getCategories() {
      Categories.get().then((res) => {
        this.categories = res.data.data.data;
      });
    },
    getProduct() {
      var id = this.$route.params.id;
      Products.getById(id).then((res) => {
        this.product = res.data.data;
        this.imgs = res.data.imgs;
        this.productdes = res.data.data.description;
      });
    },
    checkSelected(val, str) {
      if (str.indexOf(val) != -1) {
        return true;
      }
      return false;
    },
  },
};
</script>

<style>
</style>