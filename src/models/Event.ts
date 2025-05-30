import { Model, DataTypes, Sequelize } from 'sequelize';

class Event extends Model {
    public id!: number;
    public title!: string;
    public description!: string;
    public date!: Date;
    public location!: string;
    public maxParticipants!: number;
}

function initEventModel(sequelize: Sequelize) {
    Event.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            date: {
                type: DataTypes.DATE,
                allowNull: false,
                validate: {
                    isDate: true,
                    isAfter: new Date().toISOString(),
                },
            },
            location: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            maxParticipants: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    isInt: true,
                    min: 1
                },
            },
        },
        {
            sequelize,
            tableName: 'events',
            timestamps: true,
        }
    );
}

export { Event, initEventModel };
