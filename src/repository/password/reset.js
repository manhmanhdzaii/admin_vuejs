import axiosInstances from "@/repository/axios";
const name = 'reset-password';
const ResetPass = {
 post: function(data){
    return axiosInstances.post(name, data);
 },
};

export default ResetPass;