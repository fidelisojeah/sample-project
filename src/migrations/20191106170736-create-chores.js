export const up = (queryInterface, Sequelize) => queryInterface.createTable('Chores', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
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

export const down = (queryInterface, _Sequelize) => queryInterface.dropTable('Chores');

