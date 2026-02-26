import { Page } from '@playwright/test';
import { BasePage } from './base.page';
import { HomeLocators } from '../locators/home.locators';
import { OneWayTrip, RoundTrip } from '../schema/TripSchema';

/**
 * Gestiona las interacciones complejas de la página de inicio, 
 * como la selección de ciudades y fechas en el calendario.
 */
export class HomePage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async navigate(url: string = '/') {
        await this.page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    }

    async selectOrigin(city: string) {
        console.log(`Seleccionando origen: ${city}`);
        // Usamos un selector más flexible para el nombre accesible
        const trigger = this.page.getByRole('combobox', { name: /Origen|desde dónde/i });
        await trigger.waitFor({ state: 'visible' });
        await trigger.click();
        await this.page.fill(HomeLocators.searchInput, city);
        await this.page.waitForSelector(HomeLocators.suggestionItem);
        await this.page.click(`${HomeLocators.suggestionItem}:has-text("${city}")`);
    }

    async selectDestination(city: string) {
        console.log(`Seleccionando destino: ${city}`);
        // El input de destino suele abrirse automáticamente después de seleccionar el origen
        // Pero por las dudas, si no está visible, hacemos click
        if (!await this.page.isVisible(HomeLocators.searchInput)) {
            await this.page.getByRole('combobox', { name: /Destino|hacia dónde/i }).click();
        }
        await this.page.fill(HomeLocators.searchInput, city);
        await this.page.waitForSelector(HomeLocators.suggestionItem);
        await this.page.click(`${HomeLocators.suggestionItem}:has-text("${city}")`);
    }

    async enableRoundTrip() {
        console.log('Habilitando opción de Ida y Vuelta');
        await this.page.getByLabel(/Ida y vuelta/i).click({ force: true });
    }

    async selectDepartureDate(day: string, monthOrNext: boolean | string = false) {
        console.log(`Seleccionando fecha de salida: ${day} (mes: ${monthOrNext})`);
        // Seleccionar el input por su placeholder
        const fechaInput = this.page.getByPlaceholder('Ida');
        // Forzar clic para abrir el calendario
        await fechaInput.click();
        const container = this.page.locator(HomeLocators.monthWrapper).first();
        await container.waitFor({ state: 'visible' });

        if (typeof monthOrNext === 'boolean') {
            if (monthOrNext) {
                await container.getByText('→').click();
            }
        } else if (typeof monthOrNext === 'string') {
            // Navegar hasta que el mes coincida o un límite de seguridad
            let currentMonth = await container.locator(HomeLocators.monthName).nth(0).textContent();
            let attempts = 0;
            while (currentMonth && !currentMonth.toLowerCase().includes(monthOrNext.toLowerCase()) && attempts < 12) {
                await container.getByText('→').click();
                await this.page.waitForTimeout(300); // Pequeña espera para que actualice el texto
                currentMonth = await container.locator(HomeLocators.monthName).nth(0).textContent();
                attempts++;
            }
        }

        const dayLocator = container.locator(HomeLocators.calendarDay(day)).first();
        await dayLocator.scrollIntoViewIfNeeded();
        await dayLocator.waitFor({ state: 'visible' });
        await this.page.waitForTimeout(500);
        await dayLocator.click({ force: true });
    }

    async selectReturnDate(day: string, nextMonth: boolean = false) {
        console.log(`Seleccionando fecha de regreso: ${day}`);
        const container = this.page.locator(HomeLocators.returnCalendar);
        if (nextMonth) {
            await container.getByText('→').click();
        }
        const dayLocator = container.locator(HomeLocators.calendarDay(day));
        await dayLocator.scrollIntoViewIfNeeded();
        await dayLocator.waitFor({ state: 'visible' });
        await this.page.waitForTimeout(500);
        await dayLocator.click({ force: true });
    }

    async setPassengers(count: number) {
        console.log(`Configurando cantidad de pasajeros: ${count}`);
        // El subagente detectó que hay varios combobox (origen, destino, pasajeros)
        // Usamos el ID para asegurar unicidad o el índice si preferimos getByRole
        await this.page.locator('#pasajeros').selectOption(count.toString());
    }

    async clickSearch() {
        console.log("Presionando el botón 'BUSCAR'");
        await this.page.getByRole('button', { name: /BUSCAR/i }).click();
    }

    async searchOneWayTickets(trip: OneWayTrip) {
        console.log('Buscando pasajes de ida \n', trip);
        await this.selectOrigin(trip.origin);
        await this.selectDestination(trip.destination);
        await this.selectDepartureDate(trip.day, trip.month);
        if (trip.passengers > 1) {
            await this.setPassengers(trip.passengers);
        }
        await this.clickSearch();
    }

    async searchRoundTripTickets(trip: RoundTrip) {
        console.log('Buscando pasajes de ida y vuelta \n', trip);
        await this.enableRoundTrip();
        await this.selectOrigin(trip.origin);
        await this.selectDestination(trip.destination);

        // Seleccionar fecha de ida
        await this.selectDepartureDate(trip.departureDay, trip.departureMonth);

        // Para la fecha de regreso, si ya estamos en el mes siguiente por la selección de ida,
        // no necesitamos volver a navegar si la vuelta es en el mismo mes.
        // Solo navegamos si trip.returnMonth es true (flag de siguiente mes) 
        // y trip.departureMonth NO es true.
        const retNeedsNavigation = (trip.returnMonth === true) && (trip.departureMonth !== true);

        await this.selectReturnDate(trip.returnDay, retNeedsNavigation);

        if (trip.passengers > 1) {
            await this.setPassengers(trip.passengers);
        }
        await this.clickSearch();
    }
}
