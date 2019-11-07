export const up = (queryInterface, _Sequelize) =>
    queryInterface.addConstraint('DailySchedules',
        ['day_of_week', 'user_id', 'chore_id'],
        {
            type: 'unique',
            name: 'compositeDailyUnique'
        });

export const down = (queryInterface, _Sequelize) => queryInterface.removeConstraint('DailySchedules', 'compositeDailyUnique');

