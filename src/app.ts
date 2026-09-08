import express, { Response, Request } from "express" ;
import healthRouter from "./routes/health.route"
import userRouter from "./routes/user.route";
import authRouter from "./routes/auth.route";
export const app = express() ;
app.use(express.json()) ;
app.use('/api/v1',healthRouter) ;
app.use('/api/v1',userRouter) ;
app.use('/api/v1',authRouter) ;
export default app ;