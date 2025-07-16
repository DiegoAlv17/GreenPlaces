import app from "./app.js";
import clienteRoutes from './routes/cliente.routes.js'

app.use('/api',clienteRoutes)
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});