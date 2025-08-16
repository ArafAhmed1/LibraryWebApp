import express from "express";
import BorrowRequest from "../models/BorrowRequest.js";
import Book from "../models/Book.js";
import User from "../models/User.js";

const router = express.Router();

// Create a borrow request
router.post("/", async (req, res) => {
    const { userId, bookId } = req.body;
  
    try {
      // Check if the user has already requested to borrow the same book
      const existingRequest = await BorrowRequest.findOne({ userId, bookId });
      if (existingRequest) {
        return res.status(400).json({ message: "You have already requested to borrow this book." });
      }
  
      // Create a new borrow request
      const borrowRequest = new BorrowRequest({ userId, bookId });
      await borrowRequest.save();
      res.status(201).json({ message: "Borrow request created successfully!" });
    } catch (error) {
      console.error("Error creating borrow request:", error);
      res.status(500).json({ message: "Failed to create borrow request." });
    }
  });
  

// Get all borrow requests (for admin)
router.get("/", async (req, res) => {
  try {
    const requests = await BorrowRequest.find().populate("userId bookId");
    res.status(200).json(requests);
  } catch (error) {
    console.error("Error fetching borrow requests:", error);
    res.status(500).json({ message: "Failed to fetch borrow requests." });
  }
});

// Approve a borrow request
router.post("/:id/approve", async (req, res) => {
  const { id } = req.params;

  try {
      const request = await BorrowRequest.findById(id);
      if (!request) return res.status(404).json({ message: "Request not found." });

      // Check if the request is already approved or rejected
      if (request.approved) {
          return res.status(400).json({ message: "Request already approved." });
      }

      if (request.rejected) {
          return res.status(400).json({ message: "Request has already been rejected." });
      }

      // Update book and user records
      const book = await Book.findById(request.bookId);
      if (!book) return res.status(404).json({ message: "Book not found." });

      if (book.availableCopies <= 0) {
          return res.status(400).json({ message: "No copies available." });
      }

      book.availableCopies -= 1; // Decrement available copies
      await book.save();

      const user = await User.findById(request.userId);
      if (!user) return res.status(404).json({ message: "User not found." });

      // Add the borrowed book to the user's borrowedBooks array
      user.borrowedBooks.push({
          bookId: book._id,
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days due
      });
      await user.save();

      // Delete the borrow request after approval
      await BorrowRequest.findByIdAndDelete(id);

      res.status(200).json({ message: "Request approved successfully." });
  } catch (error) {
      console.error("Error approving borrow request:", error);
      res.status(500).json({ message: "Failed to approve the request." });
  }
});

  

// Reject a borrow request
router.post("/:id/reject", async (req, res) => {
  const { id } = req.params;

  try {
    const request = await BorrowRequest.findByIdAndDelete(id);
    if (!request) return res.status(404).json({ message: "Request not found." });

    res.status(200).json({ message: "Borrow request rejected." });
  } catch (error) {
    console.error("Error rejecting borrow request:", error);
    res.status(500).json({ message: "Failed to reject borrow request." });
  }
});

export default router;
