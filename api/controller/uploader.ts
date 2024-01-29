import {v2 as cloudinary} from 'cloudinary';

export const cloudinaryImageUploadMethod = async (file: any) => {
    return await new Promise((resolve, reject) => {
        try {
            cloudinary.uploader.upload(file, (err: any, res: any) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    resolve(res.secure_url);
                }
            });
        } catch (e) {
            console.error(e);
            reject(e);
        }
    });
};