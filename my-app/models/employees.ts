import {
  Model,
  Sequelize,
  DataTypes as SequelizeDataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

export default (sequelize: Sequelize, dataTypes: typeof SequelizeDataTypes) => {
  class Employees extends Model<
    InferAttributes<Employees>,
    InferCreationAttributes<Employees>
  > {
    declare id: CreationOptional<number>;
    declare name: string;
    declare email: string;
    declare createdAt?:Date;
    declare updatedAt?:Date ;

    static associate(models: any) {
      Employees.hasMany(models.Attendance, {
        foreignKey: 'employee_id',
        as: 'attendances',
      });
    }
  }

  Employees.init(
    {
      id: {
        type: dataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: dataTypes.STRING,
        allowNull: false, 
        unique: true,
      },
      createdAt:{
        allowNull: false,
        type: dataTypes.DATE,
      },
      updatedAt:{
        allowNull: false,
        type: dataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'Employees',
      tableName: 'employees',
      timestamps: true,
    }
  );

  return Employees;
};
