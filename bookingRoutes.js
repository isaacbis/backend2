const express = require('express');
const Booking = require('../models/bookingModel');
const router = express.Router();

// Ottieni tutte le prenotazioni
router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ message: 'Errore nel recupero delle prenotazioni' });
    }
});

// Aggiungi una nuova prenotazione
router.post('/', async (req, res) => {
    const { field, date, time, user } = req.body;
    try {
        const existingBooking = await Booking.findOne({ field, date, time });
        if (existingBooking) {
            return res.status(400).json({ message: 'Slot già prenotato' });
        }

        const booking = new Booking({ field, date, time, user });
        await booking.save();
        res.status(201).json(booking);
    } catch (err) {
        res.status(500).json({ message: 'Errore durante la prenotazione' });
    }
});

// Cancella una prenotazione
router.delete('/:id', async (req, res) => {
    try {
        await Booking.findByIdAndDelete(req.params.id);
        res.json({ message: 'Prenotazione cancellata' });
    } catch (err) {
        res.status(500).json({ message: 'Errore durante la cancellazione' });
    }
});

module.exports = router;
