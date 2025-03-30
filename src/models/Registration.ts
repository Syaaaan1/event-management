import { Model, DataTypes, Sequelize } from 'sequelize';
import {User} from './User';
import {Event} from './Event';

class Registration extends Model {
    public id!: number;
    public userId!: number;
    public eventId!: number;
}

function initRegistrationModel(sequelize: Sequelize) {
    Registration.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: User,
                    key: 'id',
                },
            },
            eventId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: Event,
                    key: 'id',
                },
            },
        },
        {
            sequelize,
            tableName: 'registrations',
            timestamps: true,
        }
    );

    // зв язки
    User.hasMany(Registration, { foreignKey: 'userId' });
    Event.hasMany(Registration, { foreignKey: 'eventId' });
    Registration.belongsTo(User, { foreignKey: 'userId' });
    Registration.belongsTo(Event, { foreignKey: 'eventId' });

    return Registration;
}

export default initRegistrationModel;
