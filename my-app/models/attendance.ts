import {
  Sequelize,
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
} from 'sequelize';
import employees from './employees';

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  class Attendance extends Model<
    InferAttributes<Attendance>,
    InferCreationAttributes<Attendance>
  > {
    declare id: CreationOptional<number>;
    declare employee_id: ForeignKey<number>;
    declare date: string|null;
    declare status: CreationOptional<string>;
    declare updatedAt?:Date;
     declare createdAt?:Date;


    static associate(models: any) {
      Attendance.belongsTo(models.Employees, {
        foreignKey: 'employee_id',
        as: 'employee',
      });
    }
  }

  Attendance.init(
    {
      id: {
        type: dataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      employee_id: {
        type: dataTypes.INTEGER,
        allowNull: false,
        references:{
          model:'employees',
          key:'id'
        },
        field: 'employee_id',
      },
      date: {
        type: dataTypes.DATEONLY,
        allowNull: false,
      },
      status: {
        type: dataTypes.STRING,
        allowNull: false,
        defaultValue: 'Present',
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
      modelName: 'Attendance',
      tableName: 'attendances',
      timestamps: true,
    }
  );

  return Attendance;
};
