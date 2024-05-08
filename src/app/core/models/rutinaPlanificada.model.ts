import { Ejercicio } from "./ejercicio.model";

export interface RutinaPlanificada {
    id?: string;
    nombre: string;
    descripcion: string;
    fecha: Date;
    realizada : boolean;
    ejercicios?: Ejercicio[];
}
