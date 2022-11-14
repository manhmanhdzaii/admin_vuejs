<template>
  <div class="d-sm-flex align-items-center justify-content-between mb-4">
    <h1 class="h3 mb-0 text-gray-800">Thêm sản phẩm</h1>
  </div>
  <Form
    :validation-schema="schema"
    enctype="multipart/form-data"
    @submit="save()"
  >
    <div class="mb-3">
      <label for="">Tên sản phẩm</label>
      <Field
        name="name"
        type="text"
        class="form-control"
        placeholder="Nhập tên sản phẩm...."
        v-model="product.name"
      />
      <span style="color: red" v-if="err.name"> {{ err.name[0] }} </span>
      <ErrorMessage style="color: red" name="name" />
    </div>
    <div class="mb-3">
      <label for="">Giá sản phẩm ($)</label>
      <Field
        name="price"
        type="number"
        class="form-control"
        placeholder="Nhập giá sản phẩm...."
        v-model="product.price"
      />
      <span style="color: red" v-if="err.price"> {{ err.price[0] }} </span>
      <ErrorMessage style="color: red" name="price" />
    </div>
    <div class="mb-3">
      <label for="">Màu sản phẩm</label>
      <Field
        as="select"
        name="color_id"
        id="color_id"
        class="form-control"
        v-model="product.color_id"
        multiple
      >
        <option :value="color.id" v-for="(color, index) in colors" :key="index">
          {{ color.name }}
        </option>
      </Field>
      <span style="color: red" v-if="err.color_id">
        {{ err.color_id[0] }}
      </span>
      <ErrorMessage style="color: red" name="color_id" />
    </div>
    <div class="mb-3">
      <label for="">Size sản phẩm</label>
      <Field
        as="select"
        name="size_id"
        id="size_id"
        class="form-control"
        v-model="product.size_id"
        multiple
      >
        <option :value="size.id" v-for="(size, index) in sizes" :key="index">
          {{ size.name }}
        </option>
      </Field>
      <span style="color: red" v-if="err.size_id">
        {{ err.size_id[0] }}
      </span>
      <ErrorMessage style="color: red" name="size_id" />
    </div>
    <div class="mb-3">
      <label for="">Danh mục</label>
      <Field
        as="select"
        name="category_id"
        id="category_id"
        class="form-control"
        v-model="product.category_id"
      >
        <option value="">Chọn danh mục</option>
        <option
          :value="category.id"
          v-for="(category, index) in categories"
          :key="index"
        >
          {{ category.name }}
        </option>
      </Field>
      <span style="color: red" v-if="err.category_id">
        {{ err.category_id[0] }}
      </span>
      <ErrorMessage style="color: red" name="category_id" />
    </div>
    <div class="mb-3">
      <label for="">Hình ảnh sản phẩm</label>
      <div class="custom-file">
        <Field
          type="file"
          class="form-control"
          id="img"
          name="img"
          v-model="product.img"
          @change="loadFile1($event)"
        />
        <label class="custom-file-label" for="img">Choose file</label>
      </div>
      <span style="color: red" v-if="err.img">
        {{ err.img[0] }}
      </span>
      <ErrorMessage style="color: red" name="img" />
    </div>
    <div class="mb-3">
      <div class="img_prew">
        <a class="img_show" v-if="src_img != ''">
          <img :src="src_img" /><i
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
        <a class="img_show" v-for="(item, index) in src_img_sub" :key="index">
          <img :src="item" /><i
            class="fas fa-trash delete_imgshow"
            @click="Remove_ImgShow($event)"
          ></i
        ></a>
      </div>
    </div>
    <div class="mb-3">
      <label for="">Mô tả chi tiết</label>
      <Field
        as="textarea"
        name="description"
        id="description"
        class="form-control"
        v-model="product.description"
      ></Field>
      <span style="color: red" v-if="err.description">
        {{ err.description[0] }}
      </span>
      <ErrorMessage style="color: red" name="description" />
    </div>

    <button class="btn btn-primary" type="submit">Thêm mới</button>
  </Form>
</template>

<script>
import Products from "../../repository/products";
import Categories from "../../repository/categories";
import Sizes from "../../repository/sizes";
import Colors from "../../repository/colors";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
  name: "addproduct",
  data() {
    return {
      src_img: "",
      src_img_sub: [],
      colors: [],
      sizes: [],
      categories: [],
      err: [],
      isPointer: false,
      product: {
        name: "",
        price: "",
        color_id: "",
        size_id: "",
        category_id: "",
        description: "",
        img: "",
      },
    };
  },
  created() {
    this.getColors();
    this.getSize();
    this.getCategories();
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
        price: yup.string().required().label("Price"),
        color_id: yup.array().required().label("Color"),
        size_id: yup.array().required().label("Size"),
        category_id: yup.string().required().label("Category"),
        description: yup.string().required().label("Description"),
        img: yup.string().required().label("Img"),
      });
    },
  },
  methods: {
    getColors() {
      Colors.get().then((res) => {
        // console.log(res);
        this.colors = res.data.data;
      });
    },
    getSize() {
      Sizes.get().then((res) => {
        this.sizes = res.data.data;
      });
    },
    getCategories() {
      Categories.get().then((res) => {
        this.categories = res.data.data.data;
      });
    },
    loadFile1(event) {
      var src = "";
      var name = document.getElementById("img").files[0].name;
      var ext = name.split(".").pop().toLowerCase();
      var arr_type = ["gif", "png", "jpg", "jpeg", "jfif"];
      if (arr_type.includes(ext) == false) {
        alert("Bạn chỉ được upload file ảnh");
      } else {
        var f = document.getElementById("img").files[0];
        var fsize = f.size || f.fileSize;
        if (fsize > 2097152) {
          alert("Bạn chỉ được upload file dưới 2MB");
        } else {
          src = URL.createObjectURL(event.target.files[0]);
        }
      }
      this.src_img = src;
    },
    Remove_ImgShow(e) {
      e.target.parentElement.remove();
    },
    loadFile(e) {
      var srcarr = new Array();
      var files = e.target.files;
      var num_img =
        5 - document.querySelectorAll(".img_show").length - files.length;
      if (num_img >= 0) {
        if (files.length <= 0) {
          alert("Bạn chưa chọn tệp upload");
        } else {
          for (var i = 0; i < files.length; i++) {
            var name = document.getElementById("img_sub").files[i].name;
            var ext = name.split(".").pop().toLowerCase();
            var arr_type = ["gif", "png", "jpg", "jpeg", "jfif"];
            if (arr_type.includes(ext) == false) {
              alert("Bạn chỉ được upload file ảnh");
            } else {
              var f = document.getElementById("img_sub").files[i];
              var fsize = f.size || f.fileSize;
              if (fsize > 2097152) {
                alert("Bạn chỉ được upload file dưới 2MB");
              } else {
                var src = URL.createObjectURL(e.target.files[i]);
                srcarr.push(src);
              }
            }
          }
        }
      } else {
        alert("Bạn chỉ được upload tối đa 4 ảnh");
      }
      this.src_img_sub = srcarr;
    },
    save() {
      this.isPointer = true;
      var data = new FormData();
      var img = document.querySelector("#img").files[0];
      if (img == undefined) {
        img = "";
      }
      var img_sub = document.querySelector("#img_sub").files;
      for (var i = 0; i < img_sub.length; i++) {
        data.append("img_sub[]", img_sub[i]);
      }
      data.append("name", this.product.name);
      data.append("price", this.product.price);
      data.append("color_id", this.product.color_id);
      data.append("size_id", this.product.size_id);
      data.append("category_id", this.product.category_id);
      data.append("img", img);

      data.append("description", this.product.description);

      Products.post(data).then(
        (res) => {
          if (res.data.status == "success") {
            alert("Thêm mới sản phẩm thành công");
            this.$router.push("/products/list");
          }
          console.log(res);
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

<style>
</style>