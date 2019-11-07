export default (sequelize, DataTypes) => {
    const DailySchedule = sequelize.define('DailySchedule', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        schedule_name: DataTypes.STRING,
        day_of_week: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: (new Date()).getDay(),
            validate: {
                min: 0,
                max: 6
            },
            unique: 'compositeDailyUnique'
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            unique: 'compositeDailyUnique'
        },
        chore_id: {
            type: DataTypes.UUID,
            allowNull: false,
            unique: 'compositeDailyUnique'
        }
    }, {
        underscored: true,
        timestamps: true,
        paranoid: true,
        tableName: 'DailySchedules'
    });
    DailySchedule.associate = function (models) {
        // associations can be defined here
        DailySchedule.belongsTo(models.User, {
            foreignKey: 'user_id'
        });
        DailySchedule.belongsTo(models.Chore, {
            foreignKey: 'chore_id'
        });
    };
    return DailySchedule;
};