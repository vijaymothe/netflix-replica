const express = require('express')
require("./db/config");
const User = require("./db/User");
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
const Jwt = require('jsonwebtoken');
const jwtkey = 'e-comm';
app.post("/register", async (req, resp) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password
    Jwt.sign({ result }, jwtkey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
            resp.send({ result: "Something went wrong, Please try after sometime" });
        }
        resp.send({ result, auth: token })
    })
})

app.post("/login", async (req, resp) => {
    console.log(req.body)
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            Jwt.sign({ user }, jwtkey, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    resp.send({ result: "Something went wrong, Please try after sometime" });
                }
                resp.send({ user, auth: token })
            })

        } else {
            resp.send({ result: "No User Found" });
        }
    } else {
        resp.send({ result: "No User Found" });
    }
})

app.post("/getstart", async (req, resp) => {
    console.log(req.body)
    if (req.body.email) {
        let user = await User.findOne(req.body).select("email");
        if (user) {
            Jwt.sign({ user }, jwtkey, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    resp.send({ result: "Something went wrong, Please try after sometime" });
                }
                resp.send({ user, auth: token })
            })

        } else {
            resp.send({ result: "No User Found" });
        }
    } else {
        resp.send({ result: "No User Found" });
    }
})
app.listen(5000);