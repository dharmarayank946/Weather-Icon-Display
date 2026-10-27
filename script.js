/**
 * Weather Icon Display - Vanilla JavaScript Logic
 * 
 * Features:
 * 1. JavaScript Object mapping weather conditions to icons, descriptions, and styling.
 * 2. Dynamic DOM updates on dropdown change and quick-access chips.
 * 3. Friendly default state before any selection and reset capability.
 * 4. Responsive accent theme switching without page reloads.
 * 5. Zero external dependencies - pure SVGs and emoji fallbacks.
 */

// ==========================================================================
// 1. Data Store: Weather Conditions Object
// ==========================================================================

const weatherConditions = {
  sunny: {
    name: "Sunny",
    title: "Sunny & Clear Skies",
    badge: "Clear Day",
    emoji: "☀️",
    description: "Bright and clear skies with uninterrupted sunshine. Excellent outdoor visibility with mild to warm afternoon temperatures.",
    themeClass: "theme-sunny",
    metrics: {
      temp: "28°C / 82°F",
      atmosphere: "High Clarity",
      humidity: "35%",
      wind: "10 km/h NW"
    },
    hint: "☀️ <strong>Sunlight peak:</strong> Clear conditions expected throughout the remainder of the day.",
    // Crisp inline SVG icon
    svg: `
      <svg class="weather-svg" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Sunny Icon">
        <circle cx="32" cy="32" r="14" fill="#F59E0B" stroke="#D97706" stroke-width="2.5" />
        <g stroke="#F59E0B" stroke-width="3" stroke-linecap="round">
          <line x1="32" y1="6" x2="32" y2="12" />
          <line x1="32" y1="52" x2="32" y2="58" />
          <line x1="6" y1="32" x2="12" y2="32" />
          <line x1="52" y1="32" x2="58" y2="32" />
          <line x1="13.6" y1="13.6" x2="17.8" y2="17.8" />
          <line x1="46.2" y1="46.2" x2="50.4" y2="50.4" />
          <line x1="13.6" y1="50.4" x2="17.8" y2="46.2" />
          <line x1="46.2" y1="17.8" x2="50.4" y2="13.6" />
        </g>
      </svg>
    `
  },

  cloudy: {
    name: "Cloudy",
    title: "Overcast & Cloudy Skies",
    badge: "Overcast",
    emoji: "☁️",
    description: "Dense cloud layers cover the sky, diffusing natural sunlight and producing steady, temperate atmospheric conditions.",
    themeClass: "theme-cloudy",
    metrics: {
      temp: "19°C / 66°F",
      atmosphere: "Overcast",
      humidity: "68%",
      wind: "15 km/h W"
    },
    hint: "☁️ <strong>Diffuse lighting:</strong> Thick cloud strata maintain consistent, cool temperatures.",
    svg: `
      <svg class="weather-svg" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Cloudy Icon">
        <path d="M20 44H46C51.5228 44 56 39.5228 56 34C56 28.7909 52.0238 24.5126 46.9537 24.0487C45.9221 17.1894 40.0219 12 32.8 12C26.5458 12 21.2188 16.0354 19.3444 21.7297C14.108 22.4578 10 26.963 10 32.5C10 38.8513 14.4772 44 20 44Z" 
          fill="#94A3B8" stroke="#64748B" stroke-width="2.5" stroke-linejoin="round" />
        <path d="M22 38H44C47.866 38 51 34.866 51 31C51 27.3556 48.2166 24.3628 44.6676 24.0341C43.9455 19.2326 39.8153 15.6 34.76 15.6C30.3821 15.6 26.6532 18.4248 25.3411 22.4108C21.6756 22.9205 18.8 26.0741 18.8 29.95C18.8 34.3959 21.934 38 22 38Z" 
          fill="#CBD5E1" opacity="0.6" />
      </svg>
    `
  },

  rainy: {
    name: "Rainy",
    title: "Steady Rain Showers",
    badge: "Rain Showers",
    emoji: "🌧️",
    description: "Sustained rainfall accompanied by fresh damp breezes, wet surfaces, and cool petrichor scents in the atmosphere.",
    themeClass: "theme-rainy",
    metrics: {
      temp: "16°C / 61°F",
      atmosphere: "Precipitation",
      humidity: "92%",
      wind: "22 km/h NE"
    },
    hint: "🌧️ <strong>Rainfall advisory:</strong> Carry an umbrella or waterproof outerwear for ongoing showers.",
    svg: `
      <svg class="weather-svg" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Rainy Icon">
        <path d="M18 36H44C48.4183 36 52 32.4183 52 28C52 23.8327 48.819 20.4101 44.763 20.0389C43.9377 14.5515 39.2175 10.4 33.44 10.4C28.4367 10.4 24.175 13.6283 22.6755 18.1838C18.4864 18.7662 15.2 22.3704 15.2 26.8C15.2 31.8812 18.7817 36 18 36Z" 
          fill="#38BDF8" stroke="#0284C7" stroke-width="2.5" stroke-linejoin="round" />
        <line x1="22" y1="42" x2="18" y2="54" stroke="#0284C7" stroke-width="3" stroke-linecap="round" />
        <line x1="32" y1="42" x2="28" y2="54" stroke="#0284C7" stroke-width="3" stroke-linecap="round" />
        <line x1="42" y1="42" x2="38" y2="54" stroke="#0284C7" stroke-width="3" stroke-linecap="round" />
      </svg>
    `
  },

  stormy: {
    name: "Stormy",
    title: "Thunderstorms & Lightning",
    badge: "Thunderstorm",
    emoji: "⛈️",
    description: "Intense atmospheric instability featuring vigorous rain bursts, flashing lightning discharges, and gusty gale-force winds.",
    themeClass: "theme-stormy",
    metrics: {
      temp: "14°C / 57°F",
      atmosphere: "Severe Storm",
      humidity: "96%",
      wind: "46 km/h SW"
    },
    hint: "⚡ <strong>Severe alert:</strong> Frequent lightning and high wind gusts recorded in the area.",
    svg: `
      <svg class="weather-svg" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Stormy Icon">
        <path d="M16 32H44C48.4183 32 52 28.4183 52 24C52 19.8327 48.819 16.4101 44.763 16.0389C43.9377 10.5515 39.2175 6.4 33.44 6.4C28.4367 6.4 24.175 9.6283 22.6755 14.1838C18.4864 14.7662 15.2 18.3704 15.2 22.8C15.2 27.8812 18.7817 32 16 32Z" 
          fill="#64748B" stroke="#475569" stroke-width="2.5" stroke-linejoin="round" />
        <polygon points="34,32 26,45 32,45 28,58 40,43 33,43" fill="#FBBF24" stroke="#D97706" stroke-width="1.5" stroke-linejoin="round" />
        <line x1="18" y1="40" x2="15" y2="50" stroke="#38BDF8" stroke-width="2.5" stroke-linecap="round" />
        <line x1="46" y1="40" x2="43" y2="50" stroke="#38BDF8" stroke-width="2.5" stroke-linecap="round" />
      </svg>
    `
  },

  snowy: {
    name: "Snowy",
    title: "Gentle Snowfall & Flurries",
    badge: "Freezing Snow",
    emoji: "❄️",
    description: "Below-freezing temperatures producing quiet, graceful snowfall that blankets rooftops and grounds with soft white crystalline flakes.",
    themeClass: "theme-snowy",
    metrics: {
      temp: "-2°C / 28°F",
      atmosphere: "Snow Flurries",
      humidity: "82%",
      wind: "12 km/h N"
    },
    hint: "❄️ <strong>Freezing advisory:</strong> Sub-zero chill and slick pavement surfaces reported.",
    svg: `
      <svg class="weather-svg" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Snowy Icon">
        <path d="M18 34H44C48.4183 34 52 30.4183 52 26C52 21.8327 48.819 18.4101 44.763 18.0389C43.9377 12.5515 39.2175 8.4 33.44 8.4C28.4367 8.4 24.175 11.6283 22.6755 16.1838C18.4864 16.7662 15.2 20.3704 15.2 24.8C15.2 29.8812 18.7817 34 18 34Z" 
          fill="#BAE6FD" stroke="#0284C7" stroke-width="2.5" stroke-linejoin="round" />
        <!-- Snow crystals -->
        <g stroke="#0284C7" stroke-width="2" stroke-linecap="round">
          <line x1="22" y1="42" x2="22" y2="54" />
          <line x1="16" y1="48" x2="28" y2="48" />
          <line x1="38" y1="42" x2="38" y2="54" />
          <line x1="32" y1="48" x2="44" y2="48" />
        </g>
        <circle cx="22" cy="48" r="2" fill="#0284C7" />
        <circle cx="38" cy="48" r="2" fill="#0284C7" />
        <circle cx="30" cy="56" r="2" fill="#38BDF8" />
      </svg>
    `
  },

  foggy: {
    name: "Foggy",
    title: "Dense Fog & Morning Mist",
    badge: "Low Visibility",
    emoji: "🌫️",
    description: "Moisture-saturated ground-level suspension creating a cool, silent blanket of fog that substantially reduces roadway visibility.",
    themeClass: "theme-foggy",
    metrics: {
      temp: "11°C / 52°F",
      atmosphere: "Dense Mist",
      humidity: "98%",
      wind: "4 km/h Calm"
    },
    hint: "🌫️ <strong>Visibility alert:</strong> Distance visibility under 200m; use low-beam vehicle lights.",
    svg: `
      <svg class="weather-svg" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Foggy Icon">
        <g stroke="#0F766E" stroke-width="3" stroke-linecap="round">
          <line x1="14" y1="20" x2="50" y2="20" />
          <line x1="10" y1="28" x2="54" y2="28" />
          <line x1="16" y1="36" x2="48" y2="36" />
          <line x1="12" y1="44" x2="52" y2="44" />
          <line x1="18" y1="52" x2="46" y2="52" />
        </g>
      </svg>
    `
  }
};

// ==========================================================================
// 2. Default State Definition
// ==========================================================================

const defaultState = {
  name: "Welcome to Weather Display",
  title: "Welcome to Weather Display",
  badge: "Default State",
  key: "Awaiting Selection",
  emoji: "🌤️",
  description: "Select any atmospheric condition from the dropdown list above to explore its matching icon, atmospheric summary, and ambient pastel theme accent.",
  themeClass: "theme-default",
  metrics: {
    temp: "--",
    atmosphere: "Awaiting",
    humidity: "--",
    wind: "--"
  },
  hint: "💡 <strong>Tip:</strong> Selecting any condition from Sunny to Foggy will smoothly adapt the card's accent highlights.",
  svg: `
    <svg class="weather-svg" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Default Weather Viewer Icon">
      <!-- Sun behind cloud -->
      <circle cx="24" cy="24" r="10" fill="#FBBF24" stroke="#F59E0B" stroke-width="2" />
      <g stroke="#F59E0B" stroke-width="2" stroke-linecap="round">
        <line x1="24" y1="6" x2="24" y2="10" />
        <line x1="11" y1="11" x2="14" y2="14" />
        <line x1="6" y1="24" x2="10" y2="24" />
      </g>
      <!-- Pastel Cloud -->
      <path d="M22 46H46C50.4183 46 54 42.4183 54 38C54 33.8327 50.819 30.4101 46.763 30.0389C45.9377 24.5515 41.2175 20.4 35.44 20.4C30.4367 20.4 26.175 23.6283 24.6755 28.1838C20.4864 28.7662 17.2 32.3704 17.2 36.8C17.2 41.8812 20.7817 46 22 46Z" 
        fill="#E0F2FE" stroke="#0284C7" stroke-width="2.5" stroke-linejoin="round" />
    </svg>
  `
};

// ==========================================================================
// 3. DOM Element References
// ==========================================================================

const weatherSelect = document.getElementById('weatherSelect');
const resetBtn = document.getElementById('resetBtn');
const weatherCard = document.getElementById('weatherCard');
const conditionBadge = document.getElementById('conditionBadge');
const conditionKey = document.getElementById('conditionKey');
const iconWrapper = document.getElementById('iconWrapper');
const conditionTitle = document.getElementById('conditionTitle');
const conditionDescription = document.getElementById('conditionDescription');
const metricTemp = document.getElementById('metricTemp');
const metricAtmosphere = document.getElementById('metricAtmosphere');
const metricHumidity = document.getElementById('metricHumidity');
const metricWind = document.getElementById('metricWind');
const statusHint = document.getElementById('statusHint');

// All theme class names for easy cleanup
const allThemeClasses = [
  'theme-default',
  'theme-sunny',
  'theme-cloudy',
  'theme-rainy',
  'theme-stormy',
  'theme-snowy',
  'theme-foggy'
];

// ==========================================================================
// 4. Update UI Function
// ==========================================================================

/**
 * Updates the display elements to match the selected weather condition.
 * @param {string} conditionKeyString - The key matching the weatherConditions object, or empty for default.
 */
function updateWeatherDisplay(conditionKeyString) {
  const isDefault = !conditionKeyString || !weatherConditions[conditionKeyString];
  const data = isDefault ? defaultState : weatherConditions[conditionKeyString];

  // 1. Update Body Theme Class
  document.body.classList.remove(...allThemeClasses);
  document.body.classList.add(data.themeClass);

  // 2. Update Card State Indicator
  if (isDefault) {
    weatherCard.classList.add('is-default');
  } else {
    weatherCard.classList.remove('is-default');
  }

  // 3. Update Header Badges
  conditionBadge.textContent = data.badge;
  conditionKey.textContent = isDefault ? data.key : `Condition: ${data.name}`;

  // 4. Update Icon Container with safe inline SVG and fallback aria label
  iconWrapper.innerHTML = data.svg || `<span class="emoji-icon">${data.emoji}</span>`;

  // 5. Update Text Content
  conditionTitle.textContent = data.title;
  conditionDescription.textContent = data.description;

  // 6. Update Metric Highlights
  metricTemp.textContent = data.metrics.temp;
  metricAtmosphere.textContent = data.metrics.atmosphere;
  metricHumidity.textContent = data.metrics.humidity;
  metricWind.textContent = data.metrics.wind;

  // 7. Update Hint & Advice
  statusHint.innerHTML = data.hint;

  // 8. Sync Select Dropdown Value
  if (isDefault) {
    weatherSelect.value = "";
  } else {
    weatherSelect.value = conditionKeyString;
  }
}

// ==========================================================================
// 5. Event Listeners & Interaction Handlers
// ==========================================================================

// Dropdown Change Event
weatherSelect.addEventListener('change', (event) => {
  const selectedCondition = event.target.value;
  updateWeatherDisplay(selectedCondition);
});

// Reset Button Click Event
resetBtn.addEventListener('click', () => {
  updateWeatherDisplay("");
});

// Keyboard Accessibility: pressing 'Escape' resets to default state
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    updateWeatherDisplay("");
  }
});

// ==========================================================================
// 6. Initialization on DOM Loaded
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // Mount the friendly default state
  updateWeatherDisplay("");
});
