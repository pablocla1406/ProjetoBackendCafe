'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pedido extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pedido.belongsTo(models.Pessoa, {
        foreignKey: 'cliente_id',
        as: 'cliente'
      });
      Pedido.belongsTo(models.Pessoa, {
        foreignKey: 'responsavel_id',
        as: 'responsavel'
      });
      Pedido.belongsTo(models.Bebida, {
        foreignKey: 'bebida_id',
        as: 'bebida'
      });
    }
  }
  Pedido.init({
    bebida_id: DataTypes.INTEGER,
    cliente_id: DataTypes.INTEGER,
    responsavel_id: DataTypes.INTEGER,
    unitario: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    data_compra: DataTypes.DATE,
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Pedido',
    tableName: 'Pedidos',
    timestamps: true,
    paranoid: true,
    deletedAt: 'deleted_at'
  });
  return Pedido;
};