'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bebida extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Bebida.init({
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    descricao: DataTypes.TEXT,
    preco: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    imagem: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM,
      values: ['Ativo', 'Inativo'],
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Bebida',
    tableName: 'Bebidas',
    timestamps: true,
    paranoid: true,
    deletedAt: 'deleted_at'
  });
  return Bebida;
};