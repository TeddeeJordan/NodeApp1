import express from "express"

const app = express();

app.use(express.json())

import route from "./routes/user.route.js";

//route declaration
app.use("/api/v1/users", route)

//example route: http://localhost:4000/api/v1/users/register
export default app;