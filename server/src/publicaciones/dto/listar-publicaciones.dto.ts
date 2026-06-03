import { IsIn, IsNumberString, IsOptional } from 'class-validator';

export class ListarPublicacionesDto {

    @IsOptional()
    @IsNumberString()
    offset?: string;

    @IsOptional()
    @IsNumberString()
    limit?: string;

    @IsOptional()
    @IsIn(['fecha', 'likes'])
    orden?: string;

    @IsOptional()
    usuarioId?: string;
}