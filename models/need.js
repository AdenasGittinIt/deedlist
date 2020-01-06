module.exports = function(sequelize, DataTypes) {
    var Need = sequelize.define("Need", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 140]
            }
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 140]
            }
        },
        details: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 250]
            }
        },
        status: {  
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    });
  
    Need.associate = function(models) {
        Need.belongsTo(models.People, {
            foreignKey: {
                allowNull: false
            }
        });
    };
