import express from 'express';
import { Router } from 'express';
import initSequelize from "./config/database";
import { initUserModel } from "./models/User";
import { initEventModel } from "./models/Event";
import { registerUser, loginUser } from './controllers/authController';
import eventRoutes from "./routes/eventRoutes";
import participantRoutes from './routes/participantRoutes';
import { initParticipantModel } from './models/Participants';
import { Event } from './models/Event';
import { Participant } from './models/Participants';

const app = express();
const router = Router();
const serverPORT = 5000;

app.use(express.json());
app.use("/events", eventRoutes);
app.use("/participants", participantRoutes);

app.post('/register', registerUser);
app.post('/login', loginUser);

async function startServer() {
    try {
        // підключення до БД
        const sequelize = await initSequelize();
        
        // ініц моделей
        initUserModel(sequelize);
        initEventModel(sequelize);
        initParticipantModel(sequelize);

        //асоціації
        Event.hasMany(Participant, { foreignKey: 'eventId' });
        Participant.belongsTo(Event, { foreignKey: 'eventId', as: 'event' });

        // синхронізація
        await sequelize.sync({ force: false });
        console.log("Database synced");

        app.listen(serverPORT, () => {
            console.log(`Сервер працює на порту ${serverPORT}`);
        });
    } catch (error) {
        console.error("Помилка запуску сервера:", error);
        process.exit(1);
    }
}

startServer();