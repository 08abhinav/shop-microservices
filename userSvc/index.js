import "dotenv/config"
import express from "express"
import userRoute from "./routes/route.js";
import {dbConnection} from "./db/connectDB.js"
import swaggerJSDoc from "./lib/swagger.js";
import swaggerUi from "swagger-ui-express"
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

const app = express()
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({extended: true}))

app.use('/api/user/docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc))
app.use("/api/user", userRoute);

app.get("/", (req, res)=>{
    res.status(200).json({'msg': "Hello from user service"})
})

async function main(){
    await dbConnection();
    app.listen(PORT, ()=>{
        console.log(`User service running on PORT: ${PORT}`);
    })
}

main()