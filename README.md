# Weather Icon Display (Static Data)

A clean, modern, and responsive atmospheric weather condition viewer engineered using **HTML5**, **CSS3**, and **Vanilla JavaScript (ES6+)**. This project showcases how static data stored in a JavaScript dictionary/object can dynamically update the User Interface (UI), SVG weather iconography, descriptive text, and pastel accent themes without needing external APIs or backend services.

---

## 🌟 Key Features

1. **Weather Condition Dropdown**:
   - Comprehensive dropdown menu containing all six atmospheric conditions: **Sunny**, **Cloudy**, **Rainy**, **Stormy**, **Snowy**, and **Foggy**.
2. **Matching Weather Icons & Descriptions**:
   - High-fidelity, scalable SVG weather graphics coupled with tailored meteorological descriptions for each atmospheric state.
3. **Dynamic Accent & Theme Adaptations**:
   - Ambient color shifts (e.g. golden amber for Sunny, cool slate for Cloudy, cerulean blue for Rainy, soft lavender for Stormy, icy cyan for Snowy, and misty teal for Foggy).
4. **Friendly Default State**:
   - Clear and welcoming initial view explaining how to interact with the application before any selection is made.
   - Dedicated "Reset" button and keyboard shortcut (`Escape`) to return to the friendly default view at any time.
5. **Centralized JavaScript Data Object**:
   - Clean, modular data architecture mapping condition keys to titles, descriptions, theme classes, meteorological metrics, and SVG icons.
6. **Responsive Light-Theme Design**:
   - Modern light theme on a clean white background with soft pastel blue and green accents.
   - Fluid typography (`clamp()`), rounded corners, touch-friendly interactive targets (min 44px), and adaptive grid metrics for mobile, tablet, and desktop screens.
7. **Quick-Select Chips**:
   - Accessible quick-access chips providing one-click switching synchronized with the dropdown.
8. **Zero External Image Dependencies**:
   - Pure inline vector SVGs ensuring zero broken links, instant rendering, and offline compatibility.

---

## 📁 Project Directory Structure

```text
Weather-Icon-Display/
│
├── index.html                      # Semantic HTML5 layout and accessibility markup
├── style.css                       # Responsive CSS3 styles and pastel theme classes
├── script.js                       # Vanilla JavaScript object and DOM controller
├── README.md                       # Comprehensive documentation and technical details
└── Weather-Icon-Display-Report.pdf  # Professional technical verification report
```

---

## 🧠 JavaScript Data Architecture

At the heart of the project is the `weatherConditions` JavaScript object. Storing condition data in an organized dictionary structure separates content from presentation logic, making maintenance, internationalization, and future feature expansion straightforward:

```javascript
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
    svg: `...`
  },
  // cloudy, rainy, stormy, snowy, foggy...
};
```

### Event Handling & DOM Updates
- **`change` Event**: Listens to `<select id="weatherSelect">` selections and passes the condition key to `updateWeatherDisplay()`.
- **`click` Event**: Fast quick-select chips allow rapid testing and previewing across devices.
- **Theme Class Switching**: The controller swaps body classes (`theme-sunny`, `theme-rainy`, etc.), allowing CSS variables to seamlessly update accent borders, icon glow, and badge backgrounds.

---

## 🚀 How to Run Locally

1. Clone or download this project folder:
   ```bash
   cd Weather-Icon-Display
   ```
2. Open `index.html` in any modern web browser (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari):
   - Double-click `index.html` in your file explorer, OR
   - Run a local static server:
     ```bash
     npx serve .
     # or using Python:
     python -m http.server 8000
     ```
3. Select any weather condition from the dropdown or click a quick-select chip to preview dynamic updates.

---

## 🧪 Testing and Verification Matrix

| # | Test Scenario | Input Action | Expected Result | Actual Result | Status |
|---|---------------|--------------|-----------------|---------------|--------|
| 1 | Default State Initialization | Load `index.html` | Welcoming default banner, blank dropdown prompt, and instructions displayed | Default view rendered with friendly greeting and hints | **PASS** |
| 2 | Sunny Selection | Choose "Sunny" | Sun SVG displayed, warm amber accent border and badge applied, clear sky metrics updated | All elements updated instantly | **PASS** |
| 3 | Cloudy Selection | Choose "Cloudy" | Overcast cloud SVG displayed, cool slate accent applied, humidity and overcast metrics shown | Elements and theme adapted | **PASS** |
| 4 | Rainy Selection | Choose "Rainy" | Rain cloud with drops SVG displayed, cerulean blue accent applied, shower advice shown | Theme and metrics updated | **PASS** |
| 5 | Stormy Selection | Choose "Stormy" | Lightning flash SVG displayed, lavender violet accent applied, thunderstorm metrics shown | Theme and metrics updated | **PASS** |
| 6 | Snowy Selection | Choose "Snowy" | Snowflake crystal SVG displayed, icy cyan accent applied, sub-zero temperature shown | Theme and metrics updated | **PASS** |
| 7 | Foggy Selection | Choose "Foggy" | Horizontal mist lines SVG displayed, misty teal accent applied, visibility advisory shown | Theme and metrics updated | **PASS** |
| 8 | Reset Action | Click "Reset" button | Restores dropdown to placeholder and returns card to friendly default state | Cleanly resets all fields | **PASS** |
| 9 | Mobile Responsiveness | Viewport at 375px width | Controls stack vertically, metrics grid switches to 2x2, no horizontal overflow | Fully responsive layout | **PASS** |

---

## 📄 License & Attribution

This project is open-source and free to use for educational and demonstrative purposes. Built with HTML5, CSS3, and vanilla JavaScript.
