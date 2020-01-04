module.exports = function(sequelize, DataTypes) {
    var People = sequelize.define("People", {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey:true
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 50]
            }
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 50]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 50]
            }
        },
        zip_code: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [5, 9]
            }
        },
        private: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false
        }
    });

    People.associate = function(models) {
        People.hasMany(models.Need, {
            onDelete: "cascade"
        });
    };

    return People;
};