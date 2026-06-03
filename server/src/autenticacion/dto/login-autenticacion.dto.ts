import { IsEmail, IsString, IsNotEmpty} from 'class-validator';

export class LoginAutenticacionDto {

    @IsEmail() //Verifica que sea un campo tipo email
    @IsNotEmpty() //Verifica que no este vacio
    correo: string;

    @IsString()
    @IsNotEmpty()
    contrasenia: string;
}