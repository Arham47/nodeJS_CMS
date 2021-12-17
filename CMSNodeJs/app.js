const {globalVariables} = require('./config/configuration');
// const {selectOption}=require("./config/customFunction");
const express=require("express");
const mongoose=require("mongoose");
const path=require("path");
const dotenv=require("dotenv");
const flash=require("connect-flash");
const session = require('express-session');
const layout=require("express-ejs-layouts");
const methodOverride=require("method-override")
const fileupload=require("express-fileupload");
const passport=require("passport");
// const hbs=require("express-handlebars")
//setting dotenvconfig
dotenv.config({
        path:'config.env'
})


app=express();
app.locals.selectOption=( status ,option)=>
{ return option.fn(this).replace(new RegExp('value\"'+status+'\"'),'$&selected="selected"');
}
// configure mongoose database
mongoose.connect(process.env.mongodbUrl,{   useNewUrlParser: true})
.then(res=>{
    console.log("mongodb connected")
})
.catch(err=>{
    console.log("mongodb connected unsucessfully" + err)
})
process.env.TZ = "Asia/Tehran";

// load asset
app.use('/vendor',express.static(path.resolve(__dirname,"public/vendor")))
app.use('/css',express.static(path.resolve(__dirname,"public/css")))
app.use('/js',express.static(path.resolve(__dirname,"public/js")))



// configure express
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,"public")));


// method over ride 
app.use(methodOverride('newMethod'))
app.use(fileupload());
// app.use('/',)
//flash and session setup

app.use(session({
    secret: 'anysecret',
    saveUninitialized: true,
    resave: true
}));

app.use(flash());
app.use(globalVariables);
// app.use(selectOption);
// set up view engine to handle bars
// app.engine("handlebars",hbs({defaultLayout:'default'}))
 // which is folder in views layout
 app.set("view engine", "ejs");
// app.set('views', path.join(__dirname, 'views'))
// app.engine('html', require('ejs').renderFile);


// setting layout
// app.use(layout);
// app.set("layout","./layout/default")

// routes
const defaultRoute=require("./routes/defaultRoutes")
const adminRoutes=require("./routes/adminRoutes");
const configuration = require("./config/configuration");
app.use('/', defaultRoute)
app.use('/admin', adminRoutes)

app.use(passport.initialize());
// persistent login sessions 
app.use(passport.session())


app.listen(3000,()=>{
    console.log("server has started at port localhost:3000");
})