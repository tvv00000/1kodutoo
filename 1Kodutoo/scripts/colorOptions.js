//Help 1.1
//Chatgpt: how to change color option to the selected option color in select options in js
//Help 1.2
//Chatgpt: make it so it changes option text color to white or black depending on the color
///////////////////////////////////////////////////////////////////////////////////////////



// Helper function to calculate the luminance of a color and determine opposite text color (black or white)
function getContrastColor(hexColor) {
    const r = parseInt(hexColor.substring(1, 3), 16);
    const g = parseInt(hexColor.substring(3, 5), 16);
    const b = parseInt(hexColor.substring(5, 7), 16);

    // Calculate luminance using the formula
    const luminance = 0.2126 * (r / 255) + 0.7152 * (g / 255) + 0.0722 * (b / 255);
    return luminance > 0.5 ? "#000000" : "#FFFFFF"; // Return black for light colors, white for dark colors
}

// Function to set background color and text color for each option
function setOptionColors() {
    const clockColorOptions = document.querySelectorAll('#clockColor option');
    const bgColorOptions = document.querySelectorAll('#bgColor option');

    // Apply color styles to each option in the clockColor select
    clockColorOptions.forEach(option => {
        const bgColor = option.value;
        option.style.backgroundColor = bgColor;
        option.style.color = getContrastColor(bgColor); // Set opposite text color
    });

    // Apply color styles to each option in the bgColor select
    bgColorOptions.forEach(option => {
        const bgColor = option.value;
        option.style.backgroundColor = bgColor;
        option.style.color = getContrastColor(bgColor); // Set opposite text color
    });
}

// Call the function to set colors when the page loads
document.addEventListener('DOMContentLoaded', setOptionColors);