import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organisation } from './organisation.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class OrganisationsService {
  constructor(
    @InjectRepository(Organisation) private repo: Repository<Organisation>,
  ) {}
  getAll() {
    return this.repo.find();
  }

  getById(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  getByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  async create(name: string, email: string, password: string) {
    console.log(name, email, password);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newOrganisation = this.repo.create({
      name,
      email,
      password: hashedPassword,
    });
    return this.repo.save(newOrganisation);
  }

  async remove(id: number) {
    const organisation = await this.repo.findOne({ where: { id } });
    return this.repo.remove(organisation);
  }

  async update(id: number, name: string) {
    const organisation = await this.repo.findOne({ where: { id } });
    organisation.name = name;
    return this.repo.save(organisation);
  }
}
