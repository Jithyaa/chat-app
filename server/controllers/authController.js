import bcrypt from 'bcryptjs'
import User from '../models/userModel.js'


export const signup = async (req, res) => {
    try {
        const { fullname, username, password, confirmpassword, gender } = req.body;
        if (password !== confirmpassword) {
            return res.status(400).json({ error: "Password don't match" });
        }
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ error: "User name already exists" });
        }

        // Hashing password //

        const salt = await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

       // avatar iran liara //
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new User({
            fullname,
            username,
            password:hashedPassword,
            gender,
            profilepic: gender === "Male" ? boyProfilePic : girlProfilePic
        })

        if(newUser){
            await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            fullname: newUser.fullname,
            username: newUser.username,
            profilepic: newUser.profilepic
        });
        }else{
            res.status(400).json({error:"Invalid user data"});
        }

    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ error: "Internal server error" });


    }
}


export const login = (req, res) => {
    res.send("login user");
}



export const logout = (req, res) => {
    res.send("logout user");
}