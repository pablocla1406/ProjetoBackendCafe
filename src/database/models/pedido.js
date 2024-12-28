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
      // define association here
      Pedido.belongsTo(models.Pessoa, {
        foreignKey: 'cliente_id',
        as: 'cliente'
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
    unitario: DataTypes.DECIMAL,
    total: DataTypes.DECIMAL,
    data_compra: DataTypes.DATE
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