export interface IPersona {
  dni: number;
  edad: number;
  fecha_nacimiento: string | Date;
  nombres: string;
  apellidos: string;
  jefe: boolean;
  ocupacion: number;
  estado_civil: number;
}
