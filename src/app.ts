import express, { Response, Request } from "express" ;
import healthRouter from "./routes/health.route"
export const app = express() ;
app.use(express.json()) ;
app.use('/api/v1/health',healthRouter) ;

export default app ;