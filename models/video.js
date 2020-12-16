module.exports = function(sequelize, DataTypes) {
    var Video = sequelize.define("Video", {
      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1]
          }
      },
      views: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      }
    });
  
    Video.associate = function(models) {
        // Associating Author with Posts
        // When an Author is deleted, also delete any associated Posts
        Video.hasMany(models.Comment, {
          onDelete: "cascade"
        });
      };
  
    return Video;
  };