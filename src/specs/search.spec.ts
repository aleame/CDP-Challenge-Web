/**
 * Pruebas funcionales para el flujo de búsqueda de pasajes 
 * de ida y vuelta con diferentes configuraciones.
 */
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { TicketsPage } from '../pages/tickets.page';
import { DateHelper } from '../helpers/date.helper';

test.describe('Búsqueda de Pasajes', () => {
    let homePage: HomePage;
    let ticketsPage: TicketsPage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        ticketsPage = new TicketsPage(page);
        await homePage.navigate();
    });

    test('01 Busqueda valida IDA de Buenos Aires a Rosario para el dia 28 de Marzo', async ({ page }) => {
        await homePage.searchOneWayTickets({
            origin: 'Retiro',
            destination: 'Jesus Maria',
            day: '28',
            month: 'Marzo',
            passengers: 1
        });

        await expect(page).toHaveTitle(/.*Comprar pasajes baratos.*/i);
        await expect(page).toHaveURL(/.*pasajes-micro.*/i);

        const travelOffersCount = await ticketsPage.travelOffersCount();
        expect(travelOffersCount).toBeGreaterThan(0);
        console.log(`Opciones de pasajes encontrados: ${travelOffersCount}`);
    });

    test('02 Busqueda valida IDA y VUELTA Cordoba a Salta con fechas dinamicas', async ({ page }) => {
        /**
         * En este escenario para hacer algo más dinámico
         * voy a seleccionar como fecha de salida la fecha actual + 7 dias
         * y como fecha de regreso la fecha actual + 14 dias
         * Aquí uso el helper para obtener la fecha en formato dia/mes
         * También uso el helper para verificar si la fecha está en el mes siguiente
         */
        const depDate = DateHelper.getOffsetDate(7);
        const retDate = DateHelper.getOffsetDate(14);
        await homePage.searchRoundTripTickets({
            origin: 'CBA',
            destination: 'SLT',
            departureDay: DateHelper.formatDateToDay(depDate),
            returnDay: DateHelper.formatDateToDay(retDate),
            departureMonth: DateHelper.isNextMonth(depDate),
            returnMonth: DateHelper.isNextMonth(retDate),
            passengers: 1
        });

        await expect(page).toHaveTitle(/.*Comprar pasajes baratos.*/i);
        await expect(page).toHaveURL(/.*pasajes-micro.*/i);

        const travelOffersCount = await ticketsPage.travelOffersCount();
        expect(travelOffersCount).toBeGreaterThan(0);
        console.log(`Opciones de pasajes encontradas: ${travelOffersCount}`);
    });

    test('03 Busqueda Sin Resultados IDA de Tierra del Fuego a Salta', async ({ page }) => {
        await homePage.searchOneWayTickets({
            origin: 'RGE',
            destination: 'SLT',
            day: '15',
            month: 'Julio',
            passengers: Math.floor(Math.random() * 4) + 1
        });
        await ticketsPage.verifyNewSearchButtonIsVisible();
        console.log('No se han presentado resultados para la búsqueda seleccionada');
    });

});
