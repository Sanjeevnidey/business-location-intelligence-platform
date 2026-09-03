import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import analysisRoutes from './routes/analysisRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (req,res)=>res.json({status:'ok',service:'GeoBiz API'}));
app.use('/api/analysis', analysisRoutes);

const PORT = process.env.PORT || 5001;
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(()=>console.log('MongoDB connected'))
    .catch(err=>console.error('MongoDB connection failed:', err.message));
}

app.listen(PORT, ()=>console.log(`GeoBiz API running on http://localhost:${PORT}`));
