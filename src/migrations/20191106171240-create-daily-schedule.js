export const up = (queryInterface, Sequelize) =>
    queryInterface.createTable('DailySchedules', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false
        },
        schedule_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        day_of_week: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: 0,
                max: 6
            }
        },
        user_id: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        chore_id: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
                model: 'Chores',
                key: 'id'
            }
        },
        created_at: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updated_at: {
            allowNull: false,
            type: Sequelize.DATE
        },
        deleted_at: {
            allowNull: true,
            type: Sequelize.DATE
        }
    });

export const down = (queryInterface, _Sequelize) => queryInterface.dropTable('DailySchedules');

