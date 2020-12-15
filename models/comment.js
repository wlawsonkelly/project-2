module.exports = function(sequelize, DataTypes) {
    var Comment = sequelize.define("Comment", {
      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            len: [1]
          }
      },
      VideoId:{ type: DataTypes.TEXT,
      allowNull: true
     } });
   return Comment;
  };
    // Comment.associate = function(models) {
    //   // We're saying that a Post should belong to an Author
    //   // A Post can't be created without an Author due to the foreign key constraint
    //   Comment.belongsTo(models.Video, {
    //     foreignKey: {
    //       allowNull: false
    //     }
    //   });
    // };
  
   

  //