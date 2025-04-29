const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminUserSchema = new mongoose.Schema(
  {
    // Field to store the auto-increment counter for this user.
    counter: {
      type: Number,
      default: 0,
    },
    employeeId: {
      type: String,
      unique: true,
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
      minlength: [4, 'Username must have at least 4 characters'],
      match: [
        /^(?!.*\d).*$/,
        'Username should not contain digits'
      ]
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required'],
      lowercase: true,
      match: [
        /^[a-zA-Z0-9_.+-]+@[a-z-]+\.[a-z.]+$/,
        'Please fill a valid email address'
      ]
    },
    mobileNumber: {
      type: String,
      required: [true, 'Mobile number is required'],
      match: [
        /^\d{10}$/,
        'Please fill a valid 10-digit mobile number'
      ]
    },
    city: {
      type: String,
      required: [true, 'City is required'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    role: {
      type: String,
      enum: ['manager', 'admin', 'clerk', 'delivery boy'],
      default: 'clerk',
    },
  },
  { timestamps: true }
);

// Pre-save hook: generate employeeId (with embedded random and counter) and hash password.
adminUserSchema.pre('save', async function (next) {
  // Generate employeeId only for new documents if not already set.
  if (this.isNew && !this.employeeId) {
    let prefix = '';
    switch (this.role) {
      case 'manager':
        prefix = 'MNG';
        break;
      case 'admin':
        prefix = 'ADM';
        break;
      case 'clerk':
        prefix = 'CLK';
        break;
      case 'delivery boy':
        prefix = 'DBY';
        break;
      default:
        prefix = 'EMP';
    }

    // Generate a random 5-digit number.
    const randomPart = Math.floor(10000 + Math.random() * 90000).toString();

    // Get the last inserted user for this role, sorted by the counter field in descending order.
    const lastUser = await this.constructor
      .findOne({ role: this.role })
      .sort({ counter: -1 })
      .select('counter')
      .exec();

    // Set the counter: if a user exists with this role, increment its counter; otherwise, start at 1.
    this.counter = lastUser ? lastUser.counter + 1 : 1;
    const counterFormatted = this.counter.toString().padStart(3, '0');

    // Concatenate parts to form the employeeId.
    this.employeeId = `${prefix}${randomPart}${counterFormatted}`;
  }

  // Only hash password if it is new or modified.
  if (!this.isModified('password')) return next();
  try {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
  } catch (err) {
    next(err);
  }
});

// Instance method to compare a given password with the stored hash.
adminUserSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('adminUser', adminUserSchema);