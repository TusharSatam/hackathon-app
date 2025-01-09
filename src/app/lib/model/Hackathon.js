import mongoose from 'mongoose';

const HackathonSchema = new mongoose.Schema({
    banner: { type: String }, // URL or file path for event banner
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String }, // E.g., "Online" or specific venue address
    prizes: { type: Number }, // E.g., "1st Prize: $500", "2nd Prize: Goodies", etc.
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Organizer
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Registered users
    maxParticipants: { type: Number }, // Optional maximum participant limit
    createdAt: { type: Date, default: Date.now }, // Event creation date
});

export default mongoose.models.Hackathon || mongoose.model('Hackathon', HackathonSchema);
