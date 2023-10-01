import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  HttpCode,
  Patch,
} from '@nestjs/common';
import { OrganisationsService } from './organisations.service';
import { CreateOrganisationDto } from './dtos/create-organisation.dto';

@Controller('organisations')
export class OrganisationsController {
  constructor(private organisationsService: OrganisationsService) {
    this.organisationsService = organisationsService;
  }
  @Get()
  getOrganisations() {
    return this.organisationsService.getAll();
  }

  @Get('/:id')
  getOrganisation(@Param('id') id: number) {
    return this.organisationsService.getById(id);
  }

  @Post()
  addOrganisation(@Body() body: CreateOrganisationDto) {
    console.log(body);
    return this.organisationsService.create(
      body.name,
      body.email,
      body.password,
    );
  }

  @Delete('/:id')
  @HttpCode(204)
  deleteOrganisation(@Param('id') id: number) {
    return this.organisationsService.remove(id);
  }

  @Patch('/:id')
  updateOrganisation(
    @Param('id') id: number,
    @Body() body: CreateOrganisationDto,
  ) {
    return this.organisationsService.update(id, body.name);
  }
}
