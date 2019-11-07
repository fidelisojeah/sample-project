export default (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        }
    }, {
        underscored: true,
        paranoid: true,
        timestamps: true,
        tableName: 'Users'
    });

    User.associate = function (models) {
        // associations can be defined here
    };
    return User;
};