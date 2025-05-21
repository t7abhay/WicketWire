import mongoose from "mongoose";

export const dbInstance = async () => {
  try {
    await mongoose.connect(/* Some database related credentials  */);
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
};
