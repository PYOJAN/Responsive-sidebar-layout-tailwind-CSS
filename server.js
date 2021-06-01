import app from './app';
import mongoose from 'mongoose';



// DataBase connection
const DB = process.env.DB_URI;
mongoose.connect(DB, { useUnifiedTopology: true }, () => {
    console.log(`💽 Database connected.`)
});

// Server Listen
const PORT = (process.env.NODE_ENV === 'development' ? process.env.PORT || 8000 : 8000);
app.listen(PORT, function () {
    console.log(`Server start on http://localhost:${PORT}`)
})
