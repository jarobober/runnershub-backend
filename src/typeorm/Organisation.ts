import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Organisation {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'organisation_id',
  })
  id: number;
}
