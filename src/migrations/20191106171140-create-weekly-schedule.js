export const up = (queryInterface, Sequelize) =>
    queryInterface.createTable('WeeklySchedules', {
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
        week_of_year: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: 0,
                max: 51
            }
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

export const down = (queryInterface, _Sequelize) => queryInterface.dropTable('WeeklySchedules');

