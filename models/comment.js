module.exports = function(sequelize, DataTypes) {
    var Comment = sequelize.define("Comment", {
      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      body: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1]
          }
      },
      videoUrl:{
       type: DataTypes.STRING,
       allowNull: true,
       validate:{
         len: [1]
       }
     } ,
     profileUrl: {
      type: DataTypes.STRING,
      allowNull: false
     }
    });
  

  Comment.associate = function(models) {
      // We're saying that a Post should belong to an Author
      // A Post can't be created without an Author due to the foreign key constraint
      Comment.belongsTo(models.Video, {
        foreignKey: {
          allowNull: false
        }
      });
    };
    return Comment;
  };

  //