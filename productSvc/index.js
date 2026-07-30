import express, { urlencoded } from "express"
import {dbConnection} from "./db/connectDB.js"
import swaggerUi from "swagger-ui-express"
import swaggerJSDoc from "./lib/swagger.js"
import cookieParser from "cookie-parser"
import productRoute from "./routes/route.js"

const app = express()
const PORT = process.env.PORT || 3001;

app.use(cookieParser())
app.use(express.json())
app.use(urlencoded({extended: true}))

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJSDoc))
app.use("/api/product", productRoute);

app.get("/", (req, res)=>{
    return res.status(200).json({"msg": "Hello from Product service"})
})

async function main(){
    await dbConnection();
    app.listen(PORT, ()=>{
        console.log(`Product service running on PORT: ${PORT}`);
    })
}

main();