export const up = (queryInterface, _Sequelize) =>
    queryInterface.addConstraint('WeeklySchedules',
        ['week_of_year', 'user_id', 'chore_id'],
        {
            type: 'unique',
            name: 'compositeWeeklyUnique'
        });

export const down = (queryInterface, _Sequelize) => queryInterface.removeConstraint('WeeklySchedules', 'compositeWeeklyUnique');

