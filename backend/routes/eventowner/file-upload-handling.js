import express from 'express';
const router = express.Router();
import {
    generateSignedReadURL,
    generateSignedUploadURL
} from '../../modules/s3/s3-helper.js';
import crypto from 'crypto';
import {
    query,
    body,
    validationResult
} from 'express-validator';


const ALLOWED_MIME_TYPES = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword'
];

router.post(
    "/upload",
    body("content_type").isString(),
    async (req, res) => {

        // Input Validation
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.status(400);
            return res.json({
                errors: result.array()
            });
        }

        const filename = crypto.randomBytes(20).toString('hex');
        const contentType = req.body['content_type'];

        if (ALLOWED_MIME_TYPES.includes(contentType) || contentType.startsWith("image/")) {

            try {
                const signedUrl = await generateSignedUploadURL(`eventowner/${req.session['user_id']}/files/images/${filename}`, contentType, true);

                return res.json({
                    success: true,
                    upload_url: signedUrl
                });
            } catch (error) {
                console.error(error);
                res.status(500);
                return res.json({
                    success: false,
                    msg: "Internal Server Error"
                })
            }

        } else {
            res.status(403);
            return res.json({
                success: false,
                msg: `${contentType} is not allowed to upload.`
            })
        }



    });

router.delete(
    "/delete",
    body("file_path").isString(),
    (req, res) => {

        // Input Validation
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.status(400);
            return res.json({
                errors: result.array()
            });
        }


        const filePath = req.body['file_path'];
        res.json({
            success: true
        })
    })


export default router;