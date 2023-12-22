/* eslint-disable prettier/prettier */
import { api_key, api_secret, cloud_name } from './constants';

import { v2 as cloudinary } from 'cloudinary';
// import { extractPublicId } from 'cloudinary-build-url';

export async function updateImage(
  fileImage: Express.Multer.File,
  folderName: string,
) {
  cloudinary.config({
    cloud_name: cloud_name,
    api_key: api_key,
    api_secret: api_secret,
  });

  try {
    // Upload the new image
    const uploadedImage = await cloudinary.uploader.upload(fileImage.path, {
      folder: folderName,
    });

    // Check if there was an existing image (public_id) and delete it
    // if (uploadedImage.public_id) {
    //   await cloudinary.uploader.destroy(uploadedImage.public_id);
    // }

    const secureUrl = uploadedImage.secure_url;
    return secureUrl;
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw new Error('Failed to upload image');
  }
}

export async function uploadImage(image: Express.Multer.File, folder: string) {
  cloudinary.config({
    cloud_name: cloud_name,
    api_key: api_key,
    api_secret: api_secret,
  });

  try {
    if (image) {
      const uploadedImages = await cloudinary.uploader.upload(image.path, {
        folder: folder,
      });

      const secureUrls = uploadedImages.secure_url;
      return secureUrls;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw new Error('Failed to upload image');
  }
}

export async function uploadMultipleImages(images: Array<Express.Multer.File>) {
  try {
    if (images) {
      const uploadedImages = await Promise.all(
        images.map((file) => cloudinary.uploader.upload(file.path)),
      );
      const secureUrls = uploadedImages.map((image) => image.secure_url);
      // Return the secure URLs in the response
      return secureUrls;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw new Error('Failed to upload image');
  }
}
