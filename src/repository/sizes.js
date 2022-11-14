import axiosInstances from "./axios";
const name = 'sizes';
const Sizes = {
 get: function() {
   return axiosInstances.get(name);
 }, 
};

export default Sizes;