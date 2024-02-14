import express from 'express';
const router = express.Router();

router.post("/upload", (req, res) => {
    res.json({
        success: true,
        url: "https://picsum.photos/seed/picsum/200/300"
    });
});

router.delete("/delete", (req, res) => {
    res.json({
        success: true
    })
})


export default router;