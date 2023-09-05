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
  getOrganisation(@Param('id') id: string) {
    return this.organisationsService.getById(Number(id));
  }

  @Post()
  addOrganisation(@Body() body: CreateOrganisationDto) {
    console.log(body);
    return this.organisationsService.create(body.name);
  }

  @Delete('/:id')
  @HttpCode(204)
  deleteOrganisation(@Param('id') id: string) {
    return this.organisationsService.remove(Number(id));
  }

  @Patch('/:id')
  updateOrganisation(
    @Param('id') id: string,
    @Body() body: CreateOrganisationDto,
  ) {
    return this.organisationsService.update(Number(id), body.name);
  }
}
