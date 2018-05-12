module.exports = function(sequelize, DataTypes) {
  var Categories = sequelize.define("Categories", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  Categories.associate = function(models) {
    Categories.hasMany(models.Products)
  }
  return Categories;
};
