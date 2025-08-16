// import mongoose from "mongoose";
// import Book from "./models/Book.js";  // Path to your Book model
// import User from "./models/User.js";  // Path to your User model

// // Replace with your MongoDB Atlas connection string
// const connectionString = "mongodb+srv://araf123:araf123@cluster0.chohd.mongodb.net/libraryDB?retryWrites=true&w=majority&appName=Cluster0";

// // Connect to MongoDB Atlas
// mongoose.connect(connectionString, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(async () => {
//     console.log("MongoDB connected!");

//     // Update the books collection by adding borrowedBy: []
//     // const updatedBooks = await Book.updateMany(
//     //   {},
//     //   { $set: { borrowedBy: [] } }
//     // );
//     // console.log(`Books collection updated: ${updatedBooks.modifiedCount} books`);

//     // Update the users collection by adding isBanned: false
//     const updatedUsers = await User.updateMany(
//       {},
//       { $set: { isGodAdmin: false } }
//     );
//     console.log(`Users collection updated: ${updatedUsers.modifiedCount} users`);

//     mongoose.disconnect(); // Disconnect after updates are complete
//   })
//   .catch((err) => {
//     console.error("Error connecting to MongoDB:", err);
//     mongoose.disconnect();  // Disconnect in case of error
//   });


import mongoose from "mongoose";
import User from "./models/User.js"; // Path to your User model

// Replace with your MongoDB Atlas connection string
const connectionString = "mongodb+srv://araf123:araf123@cluster0.chohd.mongodb.net/libraryDB?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB Atlas
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(async () => {
    console.log("MongoDB connected!");

    // Add the finishedBooks field to all user documents
    const updatedUsers = await User.updateMany(
      {},
      { $set: { finishedBooks: [] } } // Set finishedBooks as an empty array for all users
    );
    console.log(`Users collection updated: ${updatedUsers.modifiedCount} users`);

    mongoose.disconnect(); // Disconnect after updates are complete
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    mongoose.disconnect(); // Disconnect in case of error
  });
