
const Post=require("../models/PostModel");
const Category=require("../models/CategoryModel");
const axios=require('axios');
module.exports={
    index:(req,res)=>{
        res.render("layout/admin")
    },
    getpost:(req,res)=>{
       Post.find()
       .populate('category')
       .then(post=>{
           res.render('admin/post/index',{post:post})
       })
      
    },
    submitPost:(req,res)=>{
        
    if(req.files){     

        let file=req.files.uploadedFile;
        var filename=file.name;
        uploadDir="./public/uploads/";
        file.mv(uploadDir+filename,(err)=>{
            if(err)
                  throw err;
        })
      
    }
        if(req.body.allowComments=='on'){
            var allowc=true;
        }else{
            var allowc=false;
        }
       const newPost= new Post({
           title:req.body.title,
           description:req.body.description,
           status:req.body.status,
           allowComment:allowc,
           category:req.body.category,
           file:`/uploads/${filename}`
       });
       newPost.save()
       .then(post=>{
           res.redirect("post");
           req.flash("sucCess-message","Post is submitted successfully")
       })
       .catch(err=>{
        res.status(500).send({
            message:err.message||"some error occure while creating new user"
        })
    })

    }
    ,
    createPost:(req,res)=>{
        
        Category.find().then(cats=>{
            res.render('admin/post/create',{cats:cats})
           })
    },
    editPost:(req,res)=>{
        id=req.query.id;
        Post.findById(id)
        .populate("category")
        .then(post=>{
            Category.find().then(category=>{
                res.render("admin/post/edit",{post:post,category:category});
            })
         
        })
        .catch(err=>{
            res.status(500).send({
                message:err.message||"some error occure while creating new user"
            })
        })
    },
    editPostSubmit:(req,res)=>{
     
        id=req.body.id;
        Post.findByIdAndUpdate(id,req.body,{userFindAndModify:false})
        .then (data=>{
            if(!data){
                res.status(400).send({message:"connet update data of id "+id+"may be user not found"})
        
            }else{
                Post.find()
                .populate('category')
                .then(post=>{
                    res.render('admin/post/index',{post:post})
                })
               
            }
        })
        .catch(err=>{
            res.status(500).send({message:"updated user data"})
        })
    },
    deletePost:(req,res)=>{
        Post.findByIdAndDelete(req.params.id).then(post=>{
            Post.find().then(post=>{
                res.render('admin/post/index',{post:post})
            })
        })
    },
    getCategory:(req,res)=>{
     Category.find().then(category=>{
      res.render('admin/category/index',{category:category})
     })
    },
    geteditcategory:(req,res)=>{
         Category.find().then((cat)=>{

             Category.findById(req.params.id).then(category=>{
                 res.render('admin/category/edit',{category:category,cat:cat})
                }).catch(err=>{
                    res.status(400).send({message:"err"+err})
                })
         }).catch(err=>{
             res.status(400).send({message:"error"+err})
         });

        
    },submiteditcategory:(req,res)=>{
   
        Category.findByIdAndUpdate(req.params.id,req.body,{userFindAndModify:false}).then(data=>{
            if(!data){
                res.status(400).send({message:"content of given id is not updated"})
            }else{
                res.json({url:"admin/category"})
            }
        })
    },
    addCategory:(req,res)=>{
     
     var title=req.body.data;
     newCategory=new Category({
       title:title
     });
    
     newCategory.save().then(category=>{
      res.status(200).json(category);
     })
    },
    logout:(req,res)=>{
        req.session.destroy(err=>{
            if(err){
               return  res.redirect('/admin')
            }else{
              return res.redirect('/')
            }
        })
    }

}