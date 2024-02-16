import express from "express";
import axios from "axios";
import config from '../../../config.js';
const router = express.Router();

router.get("/geocode", async (req, res) => {
    try {
        const response = await axios.get("https://api.geoapify.com/v1/geocode/search?text=" + req.query['address'] + "&apiKey=" + config.GEOAPIFY_API_KEY)
        res.json({
            success: true,
            data: response.data
        })
    } catch (err){
        res.status(500);
        return res.json({
            success: false,
            msg: "Internal Server Error"
        })
    }
});

export default router;