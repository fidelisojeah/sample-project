export const up = (queryInterface, _Sequelize) =>
    queryInterface.addConstraint('MonthlySchedules',
        ['month_of_year', 'user_id', 'chore_id'],
        {
            type: 'unique',
            name: 'compositeMonthlyUnique'
        });

export const down = (queryInterface, _Sequelize) => queryInterface.removeConstraint('MonthlySchedules', 'compositeMonthlyUnique');

