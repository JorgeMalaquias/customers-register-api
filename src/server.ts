import express from "express";
import "express-async-errors";
import cors from "cors";
import routes from "./routes";

const server = express();


server.use(express.json());
server.use(cors());

server.use(routes);

server.listen(process.env.PORT, () => {
    console.log(`server running on port ${process.env.PORT}`);
})