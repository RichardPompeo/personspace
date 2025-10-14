import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/config/firebase";

/**
 * Uploads a profile picture to Firebase Storage
 * @param file - The image file to upload
 * @param userId - The user's ID to create a unique path
 * @returns Promise<string> - The download URL of the uploaded image
 */
export async function uploadProfilePicture(
  file: File,
  userId: string,
): Promise<string> {
  // Validate file type
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  if (!allowedTypes.includes(file.type)) {
    throw new Error(
      "Invalid file type. Only JPEG, PNG, and WebP images are allowed.",
    );
  }

  // Validate file size (max 5MB)
  const maxSize = 5 * 1024 * 1024; // 5MB in bytes
  if (file.size > maxSize) {
    throw new Error("File size too large. Maximum size is 5MB.");
  }

  // Create a unique filename with timestamp
  const timestamp = Date.now();
  const fileExtension = file.name.split(".").pop();
  const fileName = `profile_${timestamp}.${fileExtension}`;

  // Create a reference to the file location in Firebase Storage
  const storageRef = ref(storage, `profile-pictures/${userId}/${fileName}`);

  try {
    // Upload the file
    const snapshot = await uploadBytes(storageRef, file, {
      contentType: file.type,
      customMetadata: {
        uploadedAt: new Date().toISOString(),
        userId: userId,
      },
    });

    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    throw new Error("Failed to upload profile picture. Please try again.");
  }
}
