export const up = (queryInterface, Sequelize) =>
    queryInterface.createTable('SingleSchedule', {
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
        schedule_date: {
            type: Sequelize.DATE,
            allowNull: false
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

export const down = (queryInterface, _Sequelize) => queryInterface.dropTable('SingleSchedule');

