import mongoose from "mongoose";

export const dbInstance = async () => {
  try {
    await mongoose.connect(
      `${process.env.DB_CONNECTION_URL}/${process.env.DB_NAME}${process.env.DB_CONNECTION_OPTIONS}`
    );
    console.log(`Database connection established`);
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
};
