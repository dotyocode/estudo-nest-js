import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { RecadosService } from './recados.service';

@Controller('recados')
export class RecadosController {
  constructor(private readonly recadosService: RecadosService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll(@Query() pagination: any) {
    const { limit = 10, offset = 10 } = pagination;
    return this.recadosService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.recadosService.findById(id);
  }

  @HttpCode(HttpStatus.OK)
  @Post()
  create(@Body() createDTO: CreateRecadoDto) {
    return this.recadosService.create(createDTO);
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBodyDTO: UpdateRecadoDto,
  ) {
    return this.recadosService.update(id, updateBodyDTO);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  remover(@Param('id', ParseIntPipe) id: number) {
    return this.recadosService.remove(id);
  }
}
