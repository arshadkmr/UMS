let express = require("express");
let router = express.Router();
const adminHelpers = require("../helpers/adminHelpers");
const jwt = require("jsonwebtoken");
const { response } = require("express");
const db = require("../config/connection");
const collection = require("../config/collection");

router.post("/api/login", async (req, res) => {
    await adminHelpers.doAdminLogin(req.body).then((response) => {
        if (response.status) {
            const token = jwt.sign(
                {
                    name: response.user.name,
                    email: response.user.email,
                },
                "zon1998"
            );
            return res.json({ status: "ok", user: token });
        } else {
            return res.json({ status: "error", user: false });
        }
    });
});

router.get("/api/userDetails", async (req, res) => {
    const token = req.headers["x-access-token"];
    try {
        const decoded = jwt.verify(token, "zon1998");
        if (decoded) {
            const users = await adminHelpers.findAllUsers();
            return res.json({ status: "ok", userDetails: users });
        } else {
            //Access Denied
            return res.status(401).send(error);
        }
    } catch (error) {
        console.log(error);
        res.json({ status: "error", error: "Invalid token" });
    }
});

router.post("/api/deleteUser", async (req, res) => {
    const token = req.headers["x-access-token"];
    try {
        const decoded = jwt.verify(token, "zon1998");
        if (decoded) {
            console.log(req.body);
            await adminHelpers.deleteUser(req.body.id).then((response) => {
                console.log(response);
                return res.json({ status: "ok" });
            });
        } else {
            //Access Denied
            return res.status(401).send(error);
        }
    } catch (error) {
        console.log(error);
        res.json({ status: "error", error: "Invalid token" });
    }
});

router.post("/api/editUser", async (req, res) => {
    const token = req.headers["x-access-token"];
    try {
        const decoded = jwt.verify(token, "zon1998");
        if (decoded) {
            console.log(req.body);
            await adminHelpers.editUser(req.body).then((response) => {
                return res.json({ status: "ok" });
            });
        } else {
            //Access Denied
            return res.status(401).send(error);
        }
    } catch (error) {
        console.log(error);
        res.json({ status: "error", error: "Invalid token" });
    }
});

router.get("/api/search", async (req, res) => {
    try {
        const name = req.query.q;
        await db
            .get()
            .collection(collection.USER_COLLECTION)
            .find({ name: { $regex: new RegExp(name, "i") } })
            .toArray((err, results) => {
                res.json({ results: results });
            });
    } catch (error) {
        console.log(error.message);
    }
});

module.exports = router;
