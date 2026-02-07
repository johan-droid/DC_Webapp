// Force git tracking update
import 'server-only';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

export interface CloudinaryUploadResult {
    secure_url: string;
    public_id: string;
    width: number;
    height: number;
    format: string;
}

/**
 * Uploads a file buffer to Cloudinary
 */
export async function uploadToCloudinary(
    fileBuffer: Buffer,
    folder: string = 'dc_webapp',
    tags: string[] = []
): Promise<CloudinaryUploadResult> {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            {
                folder,
                tags,
                resource_type: 'auto',
            },
            (error, result) => {
                if (error) {
                    console.error('Cloudinary upload error:', error);
                    reject(error);
                    return;
                }

                if (!result) {
                    reject(new Error('Cloudinary upload failed: No result returned'));
                    return;
                }

                resolve({
                    secure_url: result.secure_url,
                    public_id: result.public_id,
                    width: result.width,
                    height: result.height,
                    format: result.format,
                });
            }
        ).end(fileBuffer);
    });
}

/**
 * Deletes an image from Cloudinary
 */
export async function deleteFromCloudinary(publicId: string): Promise<void> {
    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        console.error('Cloudinary delete error:', error);
        throw error;
    }
}

export default cloudinary;
