import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import clienteRoutes from './routes/cliente.routes.js';
import authRoutes from './routes/auth.routes.js';
import adminRoutes from './routes/admin.routes.js';

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// Routes auth
app.use('/api/auth', authRoutes);

// Routes cliente
app.use('/api', clienteRoutes);

//router admin
app.use('/api', adminRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Ha ocurrido un error en el servidor',
        error: process.env.NODE_ENV === 'production' ? {} : err
    });
});

export default app;