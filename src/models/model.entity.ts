import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Model {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  url: string;  
}