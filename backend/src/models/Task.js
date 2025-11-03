import mongoose from 'mongoose';

const TaskSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        status: {
            type: String,
            enum: ['active', 'completed'],
            default: 'active',
        },
        completedAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);
const Task = mongoose.model('Task', TaskSchema);
export default Task;