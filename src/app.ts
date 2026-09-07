import express, { Response, Request } from "express" ;
import healthRouter from "./routes/health.route"
import userRouter from "./routes/user.route";
export const app = express() ;
app.use(express.json()) ;
app.use('/api/v1',healthRouter) ;
app.use('/api/v1',userRouter)
export default app ;