import axiosInstances from "@/repository/axios";
const name = 'login';
const Login = {
 post: function(data){
    return axiosInstances.post(name, data);
 },
};

export default Login;