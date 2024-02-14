import express from 'express';
const router = express.Router();
import { generateSignedURL } from '../../modules/s3/s3-helper.js';
import crypto from 'crypto';

router.post("/upload", async (req, res) => {
    const filename = crypto.randomBytes(20).toString('hex');

    const signedUrl = await generateSignedURL(`eventowner/${req.session['user_id']}/files/images/${filename}`);
    res.json({
        success: true,
        upload_url: signedUrl
    });
});

router.delete("/delete", (req, res) => {
    res.json({
        success: true
    })
})


export default router;