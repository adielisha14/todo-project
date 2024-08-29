import axios from '../utils/axios';
function renewToken(token) {
    if (token){
        localStorage.setItem('token', token)

    }
}
const userList= async () => {
    try{
        const response = await axios.get(`/api/user`);
        
        return response.data;

    }catch(err){
        console.log(err);
        
        
    }

};
const deleteUser=async (id)=>{
    console.log(id);
    
    try{
        const response = await axios.delete(`/api/user/${id}`);
        
        return response;

    }catch(err){
        console.log(err);
        
        
    }

}


const whatRole= async(id)=>{
    try {
        const role=await axios.get(`/api/user/role/${id}`)

        return role
    } catch (error) {
        
    }
}

 const editUser= async(id,form)=>{
    try {
        const response=await axios.put(`/api/user/${id}`,form)
        renewToken(response.data.token)
        return response
    } catch (error) {
        console.log(error); 
    }
 }

 const getUser=async()=>{
    try {
        const response= await axios.get('/api/user/getUser')
        return response
    } catch (error) {
        console.log(error);
        return error
    }
 }


export { userList,deleteUser,whatRole,editUser,getUser };



