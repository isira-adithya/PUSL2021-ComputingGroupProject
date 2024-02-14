import {
    PutObjectCommand,
    GetObjectCommand,
    S3Client
} from '@aws-sdk/client-s3';
import s3RequestPresigner  from "@aws-sdk/s3-request-presigner";
import config from '../../config.js';

const s3Client = new S3Client({
    endpoint: config.S3_ENDPOINT,
    forcePathStyle: false,
    region: config.S3_REGION,
    credentials: {
        accessKeyId: config.S3_ACCESS_KEY,
        secretAccessKey: config.S3_SECRET_KEY
    }
});

const uploadObject = async (path, content) => {

    const params = {
        Bucket: config.env.s3BucketName,
        Key: path,
        Body: content,
        ACL: "private",
        Metadata: {
            "x-amz-meta-my-key": "idkaboutthisonetbh"
        }
    };

    try {
        const data = await s3Client.send(new PutObjectCommand(params));
        console.log(
            "[DEBUG] Successfully uploaded object: " +
            params.Bucket +
            "/" +
            params.Key
        );
        return data;
    } catch (err) {
        console.log("[DEBUG] Error", err);
    }
};