import axiosInstances from "./axios";
const name = 'infoUser';
const infoUser = {
 get: function() {
   return axiosInstances.get(name);
 },
 put: function(data){
    return axiosInstances.put(name,data);
 },
};

export default infoUser;