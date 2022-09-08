const About=require('../models/About')

const create = async (req, res) => {
    const {userId,content} =req.body
    if((!userId)||(!content)){
        res.status(409).json({
            message:"All fields are required!"
        })
    }
    try {
        const result = await About.create({ 
            userId,
            content,
        });
        if (result) {
            res.status(201).json({
                data:result,
                message: 'About section added successfully',
            });
        } else {
          res.status(500).json({
              message:"About section doesn't created successfully"
          })
        }

    } catch (err) {
        res.status(500).json({
            message: "Internal server problem!",
            error: err,
        })
    }
};

const show=async(req,res)=>{
    const id=req.params.id
    try {
        const result=await About.findOne({
            where:{
                userId:id
            }
        })
        if(result){
            res.status(200).json({
                data:result,
                message:"About fetched successfully"
            })
        }else{
            res.status(500).json({
                message:"No about with this id"
            })
        }
    } catch (error) {
        res.status(500).json({
            message:"Internal server problem",
            error
        })
    }
}

const update=async(req,res)=>{
    const id=req.params.id
    try {
        const result=await About.update(req.body,{
            where:{
                userId:id
            }
        })

        if(result){
            res.status(200).json({
                message:"About section updated successfully"
            })
        }else{
            res.status(500).json({
                message:"About not updated!"
            })
        }
    } catch (error) {
        res.status(500).json({
            error,
            message:"Inernal server problem"
        })
    }
}

const remove=async(req,res)=>{
    const id=req.params.id
    try {
        const result=await About.destroy({
            where:{
                userId:id
            }
        })
        if(result){
            res.status(200).json({
                message:"About deleted successfully!",
            })
        }else{
            res.status(400).json({
                message:"No About with this id",
            })
        }
    } catch (error) {
        res.status(500).json({
            message:"Internal server problem",
            error
        })
    }
}
module.exports = {
    create,
    show,
    update,
    remove
}