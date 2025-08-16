import mongoose from "mongoose";

const BorrowRequestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  approved: {
    type: Boolean,
    default: false,
  },
  rejected: {
    type: Boolean,
    default: false,
  },
  dueDate: {
    type: Date,
  },
},
{ timestamps: true });


const BorrowRequest = mongoose.model("BorrowRequest", BorrowRequestSchema);

export default BorrowRequest;
