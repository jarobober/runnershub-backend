import { Injectable } from '@nestjs/common';
import { OrganisationsService } from 'src/organisations/organisations.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private organisationsService: OrganisationsService,
    private jwtService: JwtService,
  ) {}

  async validateOrganisation(email: string, password: string): Promise<any> {
    const organisation = await this.organisationsService.getByEmail(email);
    if (organisation && bcrypt.compareSync(password, organisation.password)) {
      const { password, ...result } = organisation;
      return result;
    }

    return null;
  }

  async login(organisation: any): Promise<any> {
    const payload = {
      email: organisation.email,
      sub: organisation.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
