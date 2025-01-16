const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    field: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    user: { type: String, required: true },
});

module.exports = mongoose.model('Booking', bookingSchema);
