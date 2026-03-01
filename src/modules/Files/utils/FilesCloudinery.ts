
import cloudinary from '../../../config/cloudinary';



export const UploadFileToCloudinery = async(
    buffer: Buffer,
    fileTypeDetected: "image" | "video" | "audio" | "pdf"
): Promise<string> => {
    return new Promise((resolve, reject) => {
        let resourceType: "image" | "video" | "raw" = "image"; 
        if (fileTypeDetected === "image") resourceType = "image";
        else if (fileTypeDetected === "video") resourceType = "video";
        else resourceType = "raw";
        cloudinary.uploader.upload_stream(
            { folder: fileTypeDetected, resource_type: resourceType },
            (error, result) => {
                if (error) reject(error);
                else if (!result) reject(new Error("Cloudinary Upload Failed"));
                else resolve(result.secure_url);
            }
        ).end(buffer);
    });
};