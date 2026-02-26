/**
 * Contiene los selectores para los elementos de la página principal,
 * como inputs de origen/destino y calendarios.
 */
export const HomeLocators = {
    searchInput: 'input.select2-search__field',
    suggestionItem: 'li.select2-results__option',
    monthWrapper: '.month-wrapper',
    monthName: '.month-name .month-element',
    departureCalendar: '#cdp-calendar-container',
    returnCalendar: '#cdp-calendar-container-regreso',
    calendarDay: (day: string) => `div.day.valid:text-is("${day}")`,
    rbIdaVuelta: '#rbIdaVuelta',
};
