import User from "../models/User.js";
import Book from "../models/Book.js";
// import { addDays, format } from "date-fns"; // Optional library for date formatting

// Fetch borrowing history of the user
export const getBorrowingHistory = async (req, res) => {
  try {
    const userId = req.params.userId; // Retrieve from route params
    const user = await User.findById(userId).populate("borrowedBooks.bookId", "title author");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      borrowingHistory: user.borrowedBooks.map((entry) => ({
        bookTitle: entry.bookId.title,
        author: entry.bookId.author,
        dueDate: entry.dueDate,
        overdue: new Date(entry.dueDate) < new Date(),
      })),
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching borrowing history", error });
  }
};

// Notify user about overdue books
export const getOverdueNotifications = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate("borrowedBooks.bookId", "title");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const overdueBooks = user.borrowedBooks.filter((entry) => new Date(entry.dueDate) < new Date());

    res.status(200).json({
      overdueNotifications: overdueBooks.map((entry) => ({
        bookTitle: entry.bookId.title,
        dueDate: entry.dueDate,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching notifications", error });
  }
};
