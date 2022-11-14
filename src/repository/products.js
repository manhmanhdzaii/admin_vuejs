import axiosInstances from "@/repository/axios";
const name = 'products';
const Products = {
 get: function(params='') {
   return axiosInstances.get(name + params);
 },
 getById: function(id){
    return axiosInstances.get(name + '/'+ id);
 },
 post: function(data){
    return axiosInstances.post(name, data);
 },
 put: function(id, data){
    return axiosInstances.put(name+ '/'+ id, data);
 },
 delete: function(id){
    return axiosInstances.delete(name + '/'+ id);
 },
 
};

export default Products;