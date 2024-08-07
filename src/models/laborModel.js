import mongoose from 'mongoose';

const LaborSchema = new mongoose.Schema({
  day: {
    type: Number,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  isHoliday: {
    type: Boolean,
    required: true,
  },
  note: {
    type: String,
  },
  userId: {
    type: String,
    required: true,
    ref: 'User',
  },
  month: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  totalTime: {
    type: Number,
    required: true,
  },
  totalSalary: {
    type: Number,
    required: true,
  },
});

const Labor = mongoose.models.Labor || mongoose.model('Labor', LaborSchema);

export default Labor;
