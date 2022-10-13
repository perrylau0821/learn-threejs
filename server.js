import express from "express";
import path from "path";
import * as url from "url";
const app = express();

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
app.use(express.static(__dirname));
app.use("/", express.static(path.join(__dirname, "node_modules/three/build")));
// app.use("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));
app.listen(4000, () => console.log("connected to port 4000"));
