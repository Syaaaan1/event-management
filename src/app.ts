const express = require('express');
import { Router } from 'express';
import initSequelize from "./config/database";
import {initUserModel} from "./models/User";
import {initEventModel} from "./models/Event";
import initRegistrationModel from "./models/Registration";
import { registerUser, loginUser } from './controllers/authController';

const app = express();
const router = Router();
const serverPORT = 5000;

app.use(express.json());

async function startServer() {
    try {
        // підкл до бд
        const sequelize = await initSequelize();
        
        // мод передаючи з єднання 
        const User = await initUserModel(sequelize);
        const Event = await initEventModel(sequelize);
        const Registration = initRegistrationModel(sequelize);

        
        // синхронізація моделей з бд
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

router.post('/register', registerUser);
router.post('/login', loginUser);


startServer();
