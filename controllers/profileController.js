const Profile = require('../models/Profile')

const create = async (req, res) => {
    try {
        const result = await Profile.create(req.body);
        if (result) {
            res.status(201).json({
                data:result,
                message: 'Profile created successfully',
            });
        } else {
            res.status(500).json({
                message: "Profile doesn't created successfully"
            })
        }

    } catch (err) {
        res.status(500).json({
            message: "Internal server problem!",
            error: err,
        })
    }
};

const show = async (req, res) => {
    const id = req.params.id

    try {
        const result = await Profile.findOne({
            where: {
                userId:id
            }
        })
        if (result) {
            res.status(200).json({
                data: result,
                message: "Profile fetched successfully"
            })
        } else {
            res.status(401).json({
                message: "No profile with this id"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal server problem",
            error
        })
    }
}

const update = async (req, res) => {
    const id = req.params.id
    try {
         const profile = await Profile.findOne({
            where: {
                userId:id
            }
        })
          
        if (profile.userId!==req.user.id) {
            res.status(401).json({
                message: "User not Authorized!",
            })
        } else {
            const result = await Profile.update(req.body, {
                where: {
                    userId:id
                }
            })

            if (result) {
                res.status(200).json({
                    message: "Profile updated successfully",
                })
            } else {
                res.status(500).json({
                    message: "Profile not updated!"
                })
            }
        }

    } catch (error) {
        res.status(500).json({
            message: "Inernal server problem",
        })
    }
}

// const remove=async(req,res)=>{
//     const id=req.params.id
//     try {
//         const result=await Profile
//     } catch (error) {
//         res.status(500).json({
//             message:"Internal server problem",
//             error
//         })
//     }
// }

const uploadProfile = async (req, res) => {
    const id = req.params.id
    try {

        const result = await Profile.update({
            img: req.file.path
        }, {
            where: {
                userId:id
            }
        })
        if (result) {
            res.status(200).json({
                message: "Profile picture uploaded successfully"
            })
        } else {
            res.status(400).json({
                message: "No user with this ID"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal server problem!"
        })
    }
}

const verify=async(req,res)=>{
    const userId=req.params.id
    try {
        const result=Profile.update({verify:true},{
            where:{
                userId
            }
        })
        if(result){
            res.status(200).json({
                message:"Account verified!",
            })
        }else{
            res.status(500).json({
                message:"Something went wrong while verifing!",
            })
        }
    } catch (error) {
        res.status(500).json({
            message:"Internal server problem!"
        })
    }
}
module.exports = {
    create,
    show,
    update,
    uploadProfile,
    verify,
}