import express from "express" ;
import cookieParser from "cookie-parser";
import userRouter from "./modules/user/user.routes";
import authRouter from "./modules/auth/auth.routes" ;
import pinoHttp from "pino-http"
import { logger } from "./config/logger";
import { authRateLimiter } from "./middleware/rate-limit.middleware";
export const app = express() ;
app.use(pinoHttp({
    logger
}))
app.use(express.json()) ;
app.use(cookieParser()) ;
app.use('/api/v1/auth',authRateLimiter)
app.use('/api/v1/auth',authRouter) ;
export default app ;