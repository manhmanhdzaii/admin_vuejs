import axiosInstances from "@/repository/axios";
const name = 'colors';
const Colors = {
 get: function() {
   return axiosInstances.get(name);
 }, 
};

export default Colors;