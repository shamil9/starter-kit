const express = require("express")();
import path from "path";
import open from "open";
import webpack from "webpack";
import config from "../webpack.config.dev";

const compiler = webpack(config);
const port = 3000;

express.use(
    require("webpack-dev-middleware")(compiler, {
        noInfo: true,
        publicPath: config.output.publicPath
    })
);
express.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../src/index.html"));
});

express.listen(port, error => {
    if (error) return console.log(error);

    open(`http://localhost:${port}`);
});
