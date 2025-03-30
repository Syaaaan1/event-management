import {Sequelize} from "sequelize";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const PORT = parseInt(process.env.DB_PORT || '3306');

async function createDatabase() {
    try {
        // коннект до серверу бд
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
        });

        console.log(`Connected to MySQL server, port: ${PORT}`);

        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
        console.log(`Database '${process.env.DB_NAME}' is ready`);

        await connection.end();
        return true;
    } catch (error) {
        console.error("❌ Error creating database:", error);
        return false;
    }
}

// коннект до бд
async function initSequelize() {
    const dbCreated = await createDatabase();
    
    if (!dbCreated) {
        process.exit(1);
    }

    const sequelize = new Sequelize(
        process.env.DB_NAME as string,
        process.env.DB_USER as string,
        process.env.DB_PASSWORD as string,
        {
            host: process.env.DB_HOST,
            dialect: "mysql",
            logging: false,
        }
    );

    try {
        await sequelize.authenticate();
        console.log('Connection to database has been established successfully.');
        return sequelize;
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
}

export default initSequelize;