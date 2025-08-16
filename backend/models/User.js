import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  isGodAdmin: {
    type: Boolean,
    required: false,
    default: false,
  },
  isBanned: {
    type: Boolean,
    required: true,
    default: false, // Users are not banned by default
  },  
  borrowedBooks: [{
    bookId: { type: Schema.Types.ObjectId, ref: 'Book' },
    dueDate: { type: Date }
  }],
  wishlist: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
  finishedBooks: [{
    bookId: { type: Schema.Types.ObjectId, ref: 'Book' },
    finishedAt: { type: Date, default: Date.now }
  }] 
},{ timestamps: true });


// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;
