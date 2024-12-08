import {
  IsNotEmpty,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateRecadoDto {
  @IsString({
    message: 'O campo precisa ser texto',
  })
  @IsNotEmpty({
    message: 'O Campo texto é obrigatorio',
  })
  @MaxLength(255)
  @MinLength(5)
  readonly texto: string;

  @IsPositive()
  deId: number;

  @IsPositive()
  paraId: number;
}
