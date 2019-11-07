export default (sequelize, DataTypes) => {
    const WeeklySchedule = sequelize.define('WeeklySchedule', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        schedule_name: DataTypes.STRING,
        week_of_year: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: 0,
                max: 51
            },
            unique: 'compositeWeeklyUnique'
        },
        day_of_week: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: (new Date()).getDay(),
            validate: {
                min: 0,
                max: 6
            }
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            unique: 'compositeWeeklyUnique'
        },
        chore_id: {
            type: DataTypes.UUID,
            allowNull: false,
            unique: 'compositeWeeklyUnique'
        }
    }, {
        underscored: true,
        timestamps: true,
        paranoid: true,
        tableName: 'WeeklySchedules'
    });
    WeeklySchedule.associate = function (models) {
        // associations can be defined here
        WeeklySchedule.belongsTo(models.User, {
            foreignKey: 'user_id'
        });
        WeeklySchedule.belongsTo(models.Chore, {
            foreignKey: 'chore_id'
        });
    };
    return WeeklySchedule;
};