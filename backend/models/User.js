module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: DataTypes.STRING
    }, {
        tableName: "users",
        timestamps: false
    })

    User.associate = models => {
        User.hasMany(models.Todo, { foreignKey: "user_id" })
    }

    return User;
};