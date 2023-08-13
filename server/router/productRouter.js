import express from "express";

const router = express.Router();

router.post("/product", async (req, resp) => {
  resp.send("hjjjk");
});

export default router;
