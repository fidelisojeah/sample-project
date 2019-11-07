export default (sequelize, DataTypes) => {
    const SingleSchedule = sequelize.define('SingleSchedule', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        schedule_name: DataTypes.STRING,
        schedule_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: new Date()
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        chore_id: {
            type: DataTypes.UUID,
            allowNull: false
        }
    }, {
        underscored: true,
        timestamps: true,
        paranoid: true,
        tableName: 'SingleSchedule'
    });
    SingleSchedule.associate = function (models) {
        // associations can be defined here
        SingleSchedule.belongsTo(models.User, {
            foreignKey: 'user_id'
        });
        SingleSchedule.belongsTo(models.Chore, {
            foreignKey: 'chore_id'
        });
    };
    return SingleSchedule;
};