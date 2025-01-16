const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Carica le variabili d'ambiente

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Debug: Verifica che la variabile MONGO_URI sia definita
if (!process.env.MONGO_URI) {
    console.error('Errore: MONGO_URI non definita nel file .env');
    process.exit(1); // Termina l'app se la variabile non è configurata
}

// Connessione a MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connesso a MongoDB'))
    .catch(err => {
        console.error('Errore nella connessione a MongoDB:', err.message);
        process.exit(1); // Termina l'app in caso di errore nella connessione
    });

// Rotte API (puoi aggiungere le tue rotte qui)
app.get('/', (req, res) => {
    res.send('Backend attivo e connesso a MongoDB!');
});

// Avvio del server
app.listen(PORT, () => {
    console.log(`Server in esecuzione su http://localhost:${PORT}`);
});
