const db = require("../config/connection");
const collection = require("../config/collection");
const { response } = require("express");
const { ObjectID } = require("bson");

module.exports = {
  doAdminLogin: (adminData) => {
    return new Promise(async(resolve, reject) => {
        console.log(adminData);
        const admin= await db.get().collection(collection.ADMIN_COLLECTION).findOne({email:adminData.email})
        if(admin){
            if(adminData.password==admin.password){
                response.user=admin
                response.status=true
                resolve(response)
            }else{
                resolve({status:false})
            }
        }else{
            resolve({status:false})
        }
        
    });
  },
  findAllUsers:()=>{
    return new Promise(async(resolve,reject)=>{
        const users=await db.get().collection(collection.USER_COLLECTION).find().toArray()
        resolve(users)
    })
  },

  deleteUser:(userId)=>{
    return new Promise(async(resolve,reject)=>{
        await db.get().collection(collection.USER_COLLECTION).deleteOne({_id:ObjectID(userId)}).then((data)=>{
            console.log('delete success');
            
            resolve(data)
        })
    })
  },

  editUser:(userData)=>{
    return new Promise(async(resolve,reject)=>{
        await db.get().collection(collection.USER_COLLECTION).updateOne({_id:ObjectID(userData.id)},{
            $set:{
                name:userData.name,
                email:userData.email

            }
        }).then((response)=>{
            resolve(response)
        })
    })
  }
};
