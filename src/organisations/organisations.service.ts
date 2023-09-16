import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organisation } from './organisation.entity';

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

  create(name: string) {
    const newOrganisation = this.repo.create({ name });
    return this.repo.save(newOrganisation);
  }

  async remove(id: number) {
    const organisation = await this.repo.findOne({ where: { id } });
    return this.repo.remove(organisation);
  }

  async update(id: number, name: string) {
    const organisation = await this.repo.findOne({ where: { id } });
    organisation.name = name;
    this.repo.save(organisation);
  }
}
