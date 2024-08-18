import axios from '../utils/axios';
import {whatRole} from './user'

const login = async (credentials) => {
    try {
        const response = await axios.post('/api/auth/login', credentials);
        const { accessToken } = response.data;
        // localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', accessToken);
        let userRole=  await whatRole(accessToken)
        localStorage.setItem('role', userRole.data);
        let res= {auth:true ,role:userRole,token:accessToken}
        return res;  

    } catch (error) {
        console.log(error);
        return {auth:false ,err:error.response.data.err}
    }

};

const register = async (credentials) => {
    try {
        const response = await axios.post('/api/user', credentials);
        
        console.log(response);
        let res= await login({email:credentials.email,password:credentials.password})
        return res
        
    } catch (error) {
        let err=error.response.data.err
        if(err.includes("email_1 dup key")){

         return {auth:false,errtype:"email",err:"email in the system"};
        }else if (err.includes('username_1 dup key')){
          return{auth:false ,errtype:"username",err:"user name in the system"}  

        }
        
    }
};

const logout=()=>{
    localStorage.removeItem("token")
    localStorage.removeItem("role")

}


export {login,logout,register}