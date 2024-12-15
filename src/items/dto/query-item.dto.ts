import { Transform } from 'class-transformer';
import { IsOptional, IsString, IsNumber, Min } from 'class-validator';

export class QueryItemDto {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  search?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => parseInt(value, 10))
  page?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => parseInt(value, 10))
  limit?: number;
}
