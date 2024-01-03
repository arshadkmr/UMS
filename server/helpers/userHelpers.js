const db = require("../config/connection");
const collection = require("../config/collection");
const bcrypt = require("bcrypt");

module.exports = {
    signup: (userData) => {
        return new Promise(async (resolve, reject) => {
            let email = await db.get().collection(collection.USER_COLLECTION).findOne({ email: userData.email });

            if (email == null) {
                userData.password = await bcrypt.hash(userData.password, 10);
              
                db.get()
                    .collection(collection.USER_COLLECTION)
                    .insertOne(userData)
                    .then((data) => {
                        resolve(data);
                    });
            } else {
                resolve({ emailFound: true });
            }
        });
    },

    doLogin: (userData) => {
        return new Promise(async (resolve, reject) => {
            //   let loginStatus = false;
            let response = {};
            let user = await db.get().collection(collection.USER_COLLECTION).findOne({ email: userData.email });
            if (user) {
                bcrypt.compare(userData.password, user.password).then((status) => {
                    if (status) {
                        console.log("login success");
                        response.user = user;
                        response.status = true;
                        resolve(response);
                    } else {
                        resolve({ status: false });
                    }
                });
            } else {
                resolve({ status: false });
            }
        });
    },

    // findUser:(email)=>{
    //   return new Promise(async(resolve,reject)=>{
    //     let user=await db.get().collection(collection.USER_COLLECTION).findOne({email:email})
    //     console.log(user);
    //     resolve(user)
    //   })
    // },

    // updateQuote:(email,data)=>{
    //   return new Promise(async(resolve,reject)=>{
    //     let user = await db.get().collection(collection.USER_COLLECTION).updateOne(
    //       {email:email},
    //       {$set:{quote:data}}
    //     )
    //     console.log(user);
    //     resolve(user)
    //   })
    // }
};
