export default (sequelize, DataTypes) => {
    const MonthlySchedule = sequelize.define('MonthlySchedule', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        schedule_name: DataTypes.STRING,
        month_of_year: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: 0,
                max: 11
            },
            unique: 'compositeMonthlyUnique'
        },
        day_of_month: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: (new Date()).getDate(),
            validate: {
                min: 0,
                max: 30
            },
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            unique: 'compositeMonthlyUnique'
        },
        chore_id: {
            type: DataTypes.UUID,
            allowNull: false,
            unique: 'compositeMonthlyUnique'
        }
    }, {
        underscored: true,
        timestamps: true,
        paranoid: true,
        tableName: 'MonthlySchedules'
    });
    MonthlySchedule.associate = function (models) {
        // associations can be defined here
        MonthlySchedule.belongsTo(models.User, {
            foreignKey: 'user_id'
        });
        MonthlySchedule.belongsTo(models.Chore, {
            foreignKey: 'chore_id'
        });
    };
    return MonthlySchedule;
};