import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({
  timestamps: true,
  tableName: "alert",
})
export class Alert extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  criteria!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  criteriaValue!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  dayType!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  priceSignal!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone!: string;
}
