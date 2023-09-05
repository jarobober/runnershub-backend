import { Injectable } from '@nestjs/common';

const organisations = [
  {
    id: 1,
    name: 'Maraton Warszawski',
  },
  {
    id: 2,
    name: 'RunFree Organisation',
  },
  {
    id: 3,
    name: 'Runners Club',
  },
];

@Injectable()
export class OrganisationsService {
  getAll() {
    return organisations;
  }

  getById(id: number) {
    return organisations.find((organisation) => organisation.id === id);
  }

  create(name: string) {
    const id =
      Math.max(...organisations.map((organisation) => organisation.id)) + 1;
    const newOrganisation = { id, name };
    organisations.push(newOrganisation);
  }

  remove(id: number) {
    const index = organisations.findIndex(
      (organisation) => organisation.id === id,
    );
    organisations.splice(index, 1);
  }

  update(id: number, name: string) {
    const index = organisations.findIndex(
      (organisation) => organisation.id === id,
    );
    organisations[index].name = name;
  }
}
