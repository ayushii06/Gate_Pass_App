const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const leaveRoutes = require("./routes/Leave");
const profileRoutes = require("./routes/Profile");
const gatePassRoutes = require("./routes/GatePass");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT;

database.connect();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin:"http://localhost:5173",
        credentials:true,
    })
)
app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp",
    })
)

app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/leave",leaveRoutes);
app.use("/api/v1/gate-pass",gatePassRoutes);

app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:'Your server is up and running',
    })
});

app.listen(PORT,()=>{
    console.log(`App is listening at ${PORT}`);
});