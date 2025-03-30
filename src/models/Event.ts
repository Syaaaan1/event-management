import { Model, DataTypes, Sequelize } from 'sequelize';

class Event extends Model {
    public id!: number;
    public title!: string;
    public description!: string;
    public date!: Date;
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
