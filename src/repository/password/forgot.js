import axiosInstances from "@/repository/axios";
const name = 'forgot-password';
const ForgotPass = {
 post: function(data){
    return axiosInstances.post(name, data);
 },
};

export default ForgotPass;