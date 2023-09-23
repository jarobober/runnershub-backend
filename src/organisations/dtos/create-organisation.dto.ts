import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrganisationDto {
  @ApiProperty()
  @IsString()
  name: string;
}
