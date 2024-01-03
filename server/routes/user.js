let express = require("express");
let router = express.Router();
const userHelpers = require("../helpers/userHelpers");
const jwt = require("jsonwebtoken");
const {upload} = require('../helpers/multer')
const db = require("../config/connection");
const collection = require("../config/collection");

router.post("/api/register", async (req, res) => {
    await userHelpers
        .signup(req.body)
        .then((response) => {
            if (response.emailFound) {
                res.json({ status: "error", error: "Duplicate Email" });
            } else {
                res.json({ status: "ok" });
            }
        })
        .catch((error) => {
            res.json({ status: "error", error: "Duplicate Email" });
        });
});

router.post("/api/login", async (req, res) => {
    await userHelpers.doLogin(req.body).then((response) => {
        if (response.status) {
            const token = jwt.sign(
                {
                    name: response.user.name,
                    email: response.user.email,
                    image: response.user.image
                },
                "zon1998"
            );
            return res.json({ status: "ok", user: token });
        } else {
            return res.json({ status: "error", user: false });
        }
    });
});

router.put('/api/uploadImage',upload.single('image'), async(req,res)=>{
    const image = req.file
    const email = req.body.email  
    if (image) {
        await db.get().collection(collection.USER_COLLECTION).findOneAndUpdate({ email: email },{$set:{image:image.filename}});
        res.json({ image: image.filename});
    } else {
        res.json({ status: "Oops!! choose an image" });
    }

})
// router.get("/api/quote", async (req, res) => {
//   const token =req.headers['x-access-token']
//   try {
//     const decoded=jwt.verify(token,'zon1998')
//     const email=decoded.email
//     const user=await userHelpers.findUser(email)
//     return res.json({status:'ok',quote:user})

//   } catch (error) {
//     console.log(error);
//     res.json({statsus:'error',error:'Invalid token'})

//   }

// });

// router.post("/api/quote", async (req, res) => {
//   const token =req.headers['x-access-token']
//   try {
//     const decoded=jwt.verify(token,'zon1998')
//     const email=decoded.email
//     const user=await userHelpers.updateQuote(email,req.body.quote)
//     return res.json({status:'ok'})

//   } catch (error) {
//     console.log(error);
//     res.json({statsus:'error',error:'Invalid token'})

//   }

// });

module.exports = router;
