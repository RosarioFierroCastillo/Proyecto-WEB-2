export class Invitacion {
    token: string;
    correo_electronico: string;
    id_fraccionamiento: number;
  
    constructor(
        token: string, 
        correo_electronico: string, 
        id_fraccionamiento: number) {
      this.token = token;
      this.correo_electronico = correo_electronico;
      this.id_fraccionamiento = id_fraccionamiento;
    }
  }