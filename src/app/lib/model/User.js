import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
    participatedHackathons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hackathon' }], // Track events the user has participated in
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
