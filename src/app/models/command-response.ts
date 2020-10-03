export interface CommandResponse<T> {
  isSuccessful: boolean;
  errorMessages: string[];
  result: T;
}
export const nameof = <T>(name: keyof T) => name;

  
export interface Meters {
      activo: boolean;
      grupoJerarquia: any;
      producto: number;
      id: number;
      nombre: string;
  }

export interface MeterDetail {
    fases: Fase[];
    nombreMedidor: string;
}

export interface Fase {
  key: string;
  value: string;
}

export interface FaseDetail {
  kwh: number;
  kvarh: number;
  cosfi: number;
}


export interface Consumption {
// [es un array el response
      fecha: string; // maybe a date
      R: FaseDetail;
      S: FaseDetail;
      T: FaseDetail;
  }

  export interface Monthly {
    // [es un array el response
          date: string;
          ano: string; // maybe a date
          mes:string;      
          R: FaseDetail;
          S: FaseDetail;
          T: FaseDetail;
      }
    