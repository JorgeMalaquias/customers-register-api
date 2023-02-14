import express from "express";
import "express-async-errors";
import cors from "cors";

const server = express();


server.use(express.json());
server.use(cors());

server.listen(process.env.PORT, () => {
    console.log(`server running on port ${process.env.PORT}`);
})