// Hodiny - Lisabon a Brno
function updateClocks() {
    const now = new Date();
    const lisbon = now.toLocaleTimeString('cs-CZ', { timeZone: 'Europe/Lisbon', hour: '2-digit', minute: '2-digit' });
    const brno = now.toLocaleTimeString('cs-CZ', { timeZone: 'Europe/Prague', hour: '2-digit', minute: '2-digit' });

    const lisbonEl = document.getElementById('time-lisbon');
    const brnoEl = document.getElementById('time-brno');

    if (lisbonEl) lisbonEl.textContent = lisbon;
    if (brnoEl) brnoEl.textContent = brno;
}

// Počasí z API
async function loadWeather() {
    const container = document.getElementById('weather-container');
    if (!container) return;

    try {
        const response = await fetch('https://www.nerad.cz/weather-lisabon.php');
        const data = await response.json();

        if (data && data.forecast) {
            container.innerHTML = data.forecast.map(day => `
                <div class="bg-white/10 rounded-xl p-4 min-w-[120px] text-center">
                    <div class="text-white/60 text-sm">${day.date}</div>
                    <div class="text-3xl my-2">${day.icon || '☀️'}</div>
                    <div class="text-white font-bold">${day.temp}°C</div>
                    <div class="text-white/60 text-xs">${day.description || ''}</div>
                </div>
            `).join('');
        } else if (data && Array.isArray(data)) {
            container.innerHTML = data.map(day => `
                <div class="bg-white/10 rounded-xl p-4 min-w-[120px] text-center">
                    <div class="text-white/60 text-sm">${day.date || day.day}</div>
                    <div class="text-3xl my-2">${day.icon || '☀️'}</div>
                    <div class="text-white font-bold">${day.temp || day.temperature}°C</div>
                    <div class="text-white/60 text-xs">${day.description || day.weather || ''}</div>
                </div>
            `).join('');
        } else {
            container.innerHTML = '<p class="text-white/60">Počasí není k dispozici</p>';
        }
    } catch (error) {
        container.innerHTML = '<p class="text-white/60">Nepodařilo se načíst počasí</p>';
    }
}

// Inicializace
document.addEventListener('DOMContentLoaded', function() {
    updateClocks();
    setInterval(updateClocks, 1000);
    loadWeather();
});
