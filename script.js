const colorPicker = document.getElementById("colorPicker");
const generateButton = document.getElementById("generate");
const palette = document.getElementById("palette");

function hexToRgb(hex) {
    hex = hex.replace("#", "");

    return {
        r: parseInt(hex.substring(0, 2), 16),
        g: parseInt(hex.substring(2, 4), 16),
        b: parseInt(hex.substring(4, 6), 16)
    };
}

function rgbToHex(r, g, b) {
    return "#" + [r, g, b]
        .map(value => {
            value = Math.max(0, Math.min(255, Math.round(value)));
            return value.toString(16).padStart(2, "0");
        })
        .join("");
}

function generatePalette() {
    const base = hexToRgb(colorPicker.value);

    const colors = [
        rgbToHex(base.r * 0.35, base.g * 0.35, base.b * 0.35),

        rgbToHex(base.r * 0.6, base.g * 0.6, base.b * 0.6),

        rgbToHex(base.r, base.g, base.b),

        rgbToHex(
            base.r + (255 - base.r) * 0.35,
            base.g + (255 - base.g) * 0.35,
            base.b + (255 - base.b) * 0.35
        ),

        rgbToHex(
            base.r + (255 - base.r) * 0.7,
            base.g + (255 - base.g) * 0.7,
            base.b + (255 - base.b) * 0.7
        )
    ];

    palette.innerHTML = "";

    colors.forEach(color => {
        const swatch = document.createElement("div");

        swatch.className = "color";
        swatch.style.backgroundColor = color;
        swatch.textContent = color;

        swatch.addEventListener("click", () => {
            navigator.clipboard.writeText(color);

            swatch.textContent = "Copied!";

            setTimeout(() => {
                swatch.textContent = color;
            }, 1000);
        });

        palette.appendChild(swatch);
    });
}

generateButton.addEventListener("click", generatePalette);

generatePalette();