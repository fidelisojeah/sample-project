export default (sequelize, DataTypes) => {
    const Chore = sequelize.define('Chore', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        description: DataTypes.STRING,
        name: DataTypes.STRING
    }, {
        underscored: true,
        timestamps: true,
        paranoid: true,
        tableName: 'Chores'
    });
    Chore.associate = function (models) {
        // associations can be defined here
    };
    return Chore;
};