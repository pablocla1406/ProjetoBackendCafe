'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Pessoa extends Model {
    static associate(models) {
      Pessoa.belongsTo(models.Setor, {
        foreignKey: 'setor_id',
        as: 'Setor'
      });
    }

    checkPassword(senha) {
      return this.senha === senha;
    }
  }

  Pessoa.init({
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    usuario: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imagem: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    setor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Setores',
        key: 'id'
      }
    },
    permissao: {
      type: DataTypes.ENUM,
      values: ['USER', 'ADMIN', 'AUX'],
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Pessoa',
    tableName: 'Pessoas',
    timestamps: true,
    paranoid: true,
    deletedAt: 'deleted_at'
  });

  return Pessoa;
};