import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },

    bio: {
        type: String,
        default: "Passionate about orchestrating high-impact events that bridge the gap between innovation and legacy. With a focus on premium aesthetics and seamless execution, I strive to create unforgettable experiences for the modern elite.",
    },
    location: {
        type: String,
        default: "Silicon Valley, CA",
    },
    profileImage: {
        type: String,
        default: null,
    },
    role: {
        type: String,
        default: 'user'
    }
}, { timestamps: true });

userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
