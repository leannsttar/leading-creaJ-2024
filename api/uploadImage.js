import cloudinary from "./cloudinaryConfig.js";

const uploadImage = async (imagePath) => {
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  try {
    const result = await cloudinary.uploader.upload(imagePath, options);
    return result.public_id;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

const createOptimizedImageUrl = (publicId) => {
  const transformations = [
    `q_auto`,
    `f_auto`,
  ];

  const imageUrl = `https://res.cloudinary.com/dv79d6y4e/image/upload/w_500,f_auto,q_35/${publicId}.jpg`;

  return imageUrl;
};

export const processImage = async (imagePath) => {
  try {
    const publicId = await uploadImage(imagePath);
    const imageUrl = createOptimizedImageUrl(publicId);

    console.log("Generated image URL:", imageUrl);
    return imageUrl;
  } catch (error) {
    console.error("Error processing image:", error);
  }
};