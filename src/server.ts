import { port } from "./config/env"
import app  from "./app"
import { getUser } from "./config/db";
app.get("/api/users/:id", async (req, res) => {
  try {
    const user = await getUser(Number(req.params.id));
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

const server = app.listen(port,()=>console.log('server started at port',port))

server.requestTimeout = 30_000 ;
server.headersTimeout= 10_000 ;
server.keepAliveTimeout=5_000;