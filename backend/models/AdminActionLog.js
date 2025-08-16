import mongoose from "mongoose";
const Schema = mongoose.Schema;

const adminActionLogSchema = new Schema({
  adminId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  actionType: { type: String, required: true }, // E.g., 'BAN_USER', 'APPROVE_REQUEST', 'ADD_BOOK'
  targetId: { type: Schema.Types.ObjectId }, // Target user or book
  timestamp: { type: Date, default: Date.now },
  details: { type: String }, // Additional information about the action
});

const AdminActionLog = mongoose.model('AdminActionLog', adminActionLogSchema);

export default AdminActionLog;