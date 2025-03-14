function getImageURL(name) {
  // Check if the image name is from backend uploads
  if (name?.startsWith("uploads/") || name?.includes("/uploads/")) {
    // Remove any duplicate 'uploads/' if present
    const cleanName = name.replace(/^uploads\/|.*\/uploads\//, "uploads/");
    return `${
      import.meta.env.VITE_API_URL || "http://localhost:5000"
    }/uploads/${cleanName.replace("uploads/", "")}`;
  }
  // For local assets in frontend/src/assets/books
  return new URL(`../assets/books/${name}`, import.meta.url);
}

export { getImageURL };
