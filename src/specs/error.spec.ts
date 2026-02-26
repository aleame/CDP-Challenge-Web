/**
 * Validación de flujos alternativos y manejo de errores cuando 
 * no se encuentran resultados o hay fallas forzadas.
 */
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { TicketsPage } from '../pages/tickets.page';

test.describe('04 Escenarios de Error y Fallas Forzadas', () => {
    let homePage: HomePage;
    let ticketsPage: TicketsPage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        ticketsPage = new TicketsPage(page);
        await homePage.navigate();
    });

    test('Busqueda con Error IDA', async ({ page }) => {
        /**
         * No logré forzar una falla en la búsqueda
         * Así que voy a forzar un error en el escenario para que el mismo falle
         */
        await homePage.searchOneWayTickets({
            origin: 'Mendoza',
            destination: 'Rio Grande',
            day: '10',
            month: 'Agosto',
            passengers: 1
        });
        await expect(page).toHaveTitle(/.*Comprar pasajes baratos.*/i);
        await expect(page).toHaveURL(/.*pasajes-micro.*/i);

        const travelOffersCount = await ticketsPage.travelOffersCount();
        expect(travelOffersCount).toBeGreaterThan(0);
        console.log(`Opciones de pasajes encontradas: ${travelOffersCount}`);
    });

});
