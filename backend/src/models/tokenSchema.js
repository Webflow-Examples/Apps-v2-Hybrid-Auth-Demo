import mongoose from 'mongoose';

const tokenSchema = new mongoose.Schema({
  idToken: String,
  accessToken: String,
  userId: String,
});

export default mongoose.models?.Token || mongoose.model('Token', tokenSchema);