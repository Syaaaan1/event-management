import { Model, DataTypes, Sequelize } from 'sequelize';

class User extends Model {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
}

function initUserModel(sequelize: Sequelize) {
    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            tableName: 'users',
            timestamps: true,
        }
    );
}

export { User, initUserModel };
