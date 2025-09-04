//import phải đúng tên file, đúng đường dẫn
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs"

//Signup
export const signup = async (req, res) => {
    const {fullName, email, password} = req.body
    try {
        //Xử lý trường hợp thiếu thông tin
        if (!fullName || !email || !password) {
            return res.status(400).json({message: "Missing information!!"})
        }
        //Xử lý trường hợp password độ dài dưới 6
        if (password.length < 6) {
            return res.status(400).json({message: "Password must be at least 6 chars!"})
        }
        //Xử lý trường hợp email trùng lặp
        const user = await User.findOne({email})
        if (user) return res.status(400).json({message: "Email already exists!"})
        
        const salt = await bcrypt.genSalt(10)
        //Mã hoá password tránh vấn đề bảo mật
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        })

        if (newUser) {
            //mỗi tài khoản một id riêng biệt để nếu trùng tên, trùng pass không bị ghi đè
            generateToken(newUser._id, res)
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            })
        } else {
            res.status(400).json({message: "Invalid user data"})
        }
    }
    catch (error) {
        console.log("Error in signup controller", error.message)
        res.status(500).json({message: "Server Error"})
    }
};

export const login = (req, res) => {
    res.send("login route")
};

export const logout = (req, res) => {
    res.send("logout route")
};