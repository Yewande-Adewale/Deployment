require('./Config/config');
const express = require  ('express');
const familyRouter = require("./Router/Router")
const PORT = process.env.PORT || 2020;

const app = express();
app.use(express.json())
app.use("/uploads", express.static("uploads"));

app.use('/api',familyRouter)




app.listen(PORT, ()=>{
    console.log(`listening to port ${PORT}`);
})