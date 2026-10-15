import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    secure: true,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (
    image,
    folder = "products"
) => {
    try {
        const uploadResult = await cloudinary.uploader.upload(image, {
            folder,
            resource_type: "auto",
        });

        return {
            secure_url: uploadResult.secure_url,
            public_id: uploadResult.public_id,
            type: uploadResult.resource_type,
            name: uploadResult.original_filename,
        };
    } catch (error) {
        console.error("Cloudinary upload error:", error.message);
        throw new Error(`Cloudinary upload failed: ${error.message}`);
    }
};

export const optimizeUrl = (publicId) =>
    cloudinary.url(publicId, {
        fetch_format: "auto",
        quality: "auto",
        secure: true,
    });

export const autoCropUrl = (publicId) =>
    cloudinary.url(publicId, {
        crop: "auto",
        gravity: "auto",
        width: 500,
        height: 500,
        secure: true,
    });

export default cloudinary;