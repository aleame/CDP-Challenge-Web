export class DateHelper {
    /**
     * Retorna un objeto Date con un desplazamiento respecto a hoy.
     * @param days Número de días de desplazamiento.
     */
    static getOffsetDate(days: number): Date {
        const date = new Date();
        date.setDate(date.getDate() + days);
        return date;
    }

    /**
     * Retorna true si la fecha dada está en un mes diferente a otra fecha.
     * @param date La fecha a verificar.
     * @param relativeTo La fecha contra la cual comparar (por defecto es hoy).
     */
    static isNextMonth(date: Date, relativeTo: Date = new Date()): boolean {
        return date.getMonth() !== relativeTo.getMonth();
    }

    /**
     * Formatea un objeto Date para retornar su componente de día como un string.
     */
    static formatDateToDay(date: Date): string {
        return date.getDate().toString();
    }

    /**
     * Retorna el nombre del mes en español para una fecha dada.
     * @param date La fecha de la cual obtener el mes.
     */
    static getMonthName(date: Date): string {
        const meses = [
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];
        return meses[date.getMonth()];
    }
}
