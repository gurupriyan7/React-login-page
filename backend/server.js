const express=require('express')
bodyparser=require('body-parser')
const userRouter=require('./routes/user')
const adminRouter = require('./routes/admin')
const mongoose=require('mongoose');
const env = require("dotenv")
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
const app=express();
env.config()


// body-parser
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

mongoose.connect('mongodb+srv://gurupriyan:gurupriyanj@cluster0.d5u4l4i.mongodb.net/?retryWrites=true&w=majority',{
     useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
          console.log("Db connected successfully");
}).catch((err)=>{
          console.log("and error occured",err);
})


app.use('/api/users',userRouter)
app.use('/api/admin',adminRouter)

app.use(notFound)
app.use(errorHandler)
app.listen(5000,console.log('server started on PORT 5000'))

