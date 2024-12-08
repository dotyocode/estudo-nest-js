import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PessoasService } from 'src/pessoas/pessoas.service';
import { Repository } from 'typeorm';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { Recado } from './entities/recado.entity';

@Injectable()
export class RecadosService {
  constructor(
    @InjectRepository(Recado)
    private readonly reacdoRepository: Repository<Recado>,
    private readonly pessoaService: PessoasService,
  ) {}

  async findAll() {
    try {
      const recados = await this.reacdoRepository.find({
        relations: ['de', 'para'],
        order: {
          id: 'desc',
        },
        select: {
          de: {
            id: true,
            nome: true,
          },
          para: {
            id: true,
            nome: true,
          },
        },
      });
      return recados;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async findById(id: number) {
    const recado = await this.reacdoRepository.findOne({
      where: {
        id,
      },
      relations: ['de', 'para'],
      select: {
        de: {
          id: true,
          nome: true,
        },
        para: {
          id: true,
          nome: true,
        },
      },
    });

    if (!recado) {
      throw new NotFoundException(`Recado não encontrado.`);
    }

    return recado;
  }

  async create(createRecadoDTO: CreateRecadoDto) {
    const { deId, paraId } = createRecadoDTO;
    const de = await this.pessoaService.findOne(deId);
    const para = await this.pessoaService.findOne(paraId);
    try {
      const novoRecado = {
        texto: createRecadoDTO.texto,
        de,
        para,
        lido: false,
        data: new Date(),
      };

      const recado = await this.reacdoRepository.create(novoRecado);
      this.reacdoRepository.save(recado);
      return {
        ...recado,
        de: { id: recado.de.id },
        para: { id: recado.para.id },
      };
    } catch (error) {
      throw new Error(`Erro ao criar recado.`);
    }
  }

  async update(id: number, updateRecadoDTO: UpdateRecadoDto) {
    const recado = await this.findById(id);

    recado.texto = updateRecadoDTO?.texto ?? recado.texto;
    recado.lido = updateRecadoDTO?.lido ?? recado.lido;

    await this.reacdoRepository.save(recado);

    return 'Recado editado com sucesso!';
  }

  async remove(id: number) {
    const recado = await this.reacdoRepository.findOneBy({ id });

    if (!recado) {
      throw new NotFoundException(`Recado não encontrado.`);
    }

    this.reacdoRepository.remove(recado);

    return 'Recado deletado com sucesso!';
  }
}
