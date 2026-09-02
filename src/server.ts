import { port } from "./config/env"
import app  from "./app"

app.listen(port,()=>console.log('server started at port',port))