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

