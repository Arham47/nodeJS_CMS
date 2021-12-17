const Post=require("../models/PostModel");
const Category=require("../models/CategoryModel");
const User=require("../models/UserModel").user;
const bcrypt=require("bcryptjs");
module.exports={
    index: async (req,res)=>{
const post= await Post.find();
const category=await Category.find();
        res.render("layout/default",{post:post,category:category});

    },
    loginget: (req,res)=>{
        res.render("default/login");
    },
    loginpost:(req,res)=>{

    
    },
    register: (req,res)=>{
        res.render("default/register");
    },
    registerpost:(req,res)=>{
     let error=[];
     if(!req.body.firstName){
         error.push({message:"firstName is empty"})
     }
     if(!req.body.lastName){
         error.push({message:"lastName is empty"})
     }
     if(!req.body.email){
         error.push({message:"email is empty"})
     }
     if(!req.body.password){
         error.push({message:"password is empty"})
     }
    if(error.length>0){
        res.render("default/register",{
            error:errors,
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email
        })

    }else{
        User.findOne({email:req.body.email}).then(user=>{
            if(user){
                res.redirect('/login')
            }else{
                const newUser=new User(req.body)
                bcrypt.genSalt((err,salt)=>{
                    bcrypt.hash(newUser.password,salt,(err,hash)=>{
                        newUser.password=hash;
                            newUser.save().then((user)=>{
                                res.redirect("/login");
                            })
                    })
                })
            }
        })
    }

    }
}