/* eslint-disable prettier/prettier */
import { api_key, api_secret, cloud_name, template_id } from './constants';
import { Request } from 'express';

import { v2 as cloudinary } from 'cloudinary';
import * as sgMail from '@sendgrid/mail';
import { UnauthorizedException } from '@nestjs/common';

sgMail.setApiKey(process.env.SENDGRID_SECRET);

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
    cloudinary.config({
      cloud_name: cloud_name,
      api_key: api_key,
      api_secret: api_secret,
    });
    if (images) {
      const uploadedImages = await Promise.all(
        images.map((file) =>
          cloudinary.uploader.upload(file.path, { folder: 'car_mages' }),
        ),
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

export async function sendGridMail(email: string, dynamicData: any) {
  const msg = {
    to: email,
    from: 'olaoluwa.dev@gmail.com',
    dynamicTemplateData: dynamicData,
    templateId: template_id,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
    })
    .catch((error: any) => {
      console.error(error);
    });
}

export async function checkUserRole(userObj: Request) {
  if ('CUSTOMER' !== userObj.user.role) {
    throw new UnauthorizedException(
      'You do not have the role to perform this action.',
    );
  }
}
