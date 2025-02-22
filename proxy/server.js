const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use(
  "/graphql",
  createProxyMiddleware({
    target: "http://localhost:8000",
    changeOrigin: true,
    pathRewrite: { "^/graphql": "/graphql" },
  })
);

app.listen(4000, () => {
  console.log("Proxy running on http://localhost:4000");
});
