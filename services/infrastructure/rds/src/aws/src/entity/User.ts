import {Entity, BaseEntity, PrimaryGeneratedColumn,
    UpdateDateColumn, CreateDateColumn, Column} from 'typeorm';

@Entity()
export class User extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column()
    firstName: string;

  @Column()
    lastName: string;

  @Column()
    email: string;

  @Column()
    role: string;

  @CreateDateColumn() public createdAt: Date;
  @UpdateDateColumn() public updatedAt: Date;

  static async findById(id:string) {
      const user = await this.findOne({
          where: {
              id,
            },
        });

      return user;
    }

}
