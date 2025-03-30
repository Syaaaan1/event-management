import { Model, DataTypes, Sequelize } from 'sequelize';

class Participant extends Model {
    public id!: number;
    public eventId!: number;
    public userId!: number;
}

function initParticipantModel(sequelize: Sequelize) {
    Participant.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            eventId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            tableName: 'participants',
            timestamps: true,
        }
    );
}

export { Participant, initParticipantModel };