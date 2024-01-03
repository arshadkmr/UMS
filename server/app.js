const express=require('express')
const app=express()
const cors=require('cors')
const db=require('./config/connection')


app.use(cors())
app.use(express.json())

const userRouter=require('./routes/user')
const adminRouter=require('./routes/admin')

// app.post('/api/register',async(req,res)=>{
//     console.log(req.body);
//     res.json({status:'ok'})
//  })

app.use('/',userRouter);
app.use('/admin',adminRouter);

db.connect((err)=>{
    if(err) console.log("Connection Error"+err);
    else console.log("Database Connected to port 27017");
  })

app.listen(3001,()=>{
    console.log('Server started on 3001');
})