const bcrypt=require('bcrypt');
module.exports={
    saltRounds: +process.env.SALT_ROUNDS,
    hashP: async function(str){
        try{

            let hash= await bcrypt.hash(str,module.exports.saltRounds)
            return hash;
        }catch(err){
            console.log(err.massege);
            return err
        }

    }
}
