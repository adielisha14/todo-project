import axios from '../utils/axios';
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

 const editUser= async(form)=>{
    try {
        const response=await axios.put(`/api/user/${id}`)
        return response
    } catch (error) {
        console.log(error); 
    }
 }


export { userList,deleteUser,whatRole,editUser };



