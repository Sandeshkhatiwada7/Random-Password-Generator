function generatePassword(passLength, includeLowercase, includeUppercase, includeNumbers, includeSymbols) {
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+:?>|}<{~";

    let allowedChars = "";
    let password = "";

    allowedChars += includeLowercase ? lowercaseChars : "";
    allowedChars += includeUppercase ? uppercaseChars : "";
    allowedChars += includeNumbers ? numberChars : "";
    allowedChars += includeSymbols ? symbolChars : "";

    if (passLength <= 0) {
        return null;
    }

    if (allowedChars.length === 0) {
        return null;
    }

    for (let i = 0; i < passLength; i++) {
        const randomIndex = Math.floor(Math.random() * allowedChars.length);
        password += allowedChars[randomIndex];
    }

    return password;
}

// Feedback messages
const feedbackMessages = {
    success: '✓ Copied to clipboard',
    error: '✗ Failed to copy',
    noOptions: '✗ Select at least one character type'
};
function calculateStrength(password) {
    let strength = 0;

    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (password.length >= 16) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[!@#$%^&*()_+:?>|}<{~]/.test(password)) strength++;

    if (strength <= 3) return "weak";
    if (strength <= 5) return "medium";
    return "strong";
}

// DOM Elements
const passLengthSlider = document.getElementById("passLength");
const passLengthNumber = document.getElementById("passLengthNumber");
const lengthValue = document.getElementById("lengthValue");
const includeLowercaseCheckbox = document.getElementById("includeLowercase");
const includeUppercaseCheckbox = document.getElementById("includeUppercase");
const includeNumbersCheckbox = document.getElementById("includeNumbers");
const includeSymbolsCheckbox = document.getElementById("includeSymbols");
const generateBtn = document.getElementById("generateBtn");
const passwordResult = document.getElementById("passwordResult");
const copyBtn = document.getElementById("copyBtn");
const resultSection = document.getElementById("resultSection");
const feedback = document.getElementById("feedback");
const strengthMeter = document.getElementById("strengthMeter");
const strengthFill = document.getElementById("strengthFill");
const strengthText = document.getElementById("strengthText");

// Sync slider and number input
passLengthSlider.addEventListener("input", (e) => {
    const value = e.target.value;
    passLengthNumber.value = value;
    lengthValue.textContent = value;
});

passLengthNumber.addEventListener("input", (e) => {
    let value = e.target.value;
    if (value < 4) value = 4;
    if (value > 50) value = 50;
    passLengthSlider.value = value;
    passLengthNumber.value = value;
    lengthValue.textContent = value;
});

// Generate Password on Button Click
generateBtn.addEventListener("click", () => {
    const passLength = parseInt(passLengthSlider.value);
    const includeLowercase = includeLowercaseCheckbox.checked;
    const includeUppercase = includeUppercaseCheckbox.checked;
    const includeNumbers = includeNumbersCheckbox.checked;
    const includeSymbols = includeSymbolsCheckbox.checked;

    // Validate that at least one option is selected
    if (!includeLowercase && !includeUppercase && !includeNumbers && !includeSymbols) {
        feedback.textContent = feedbackMessages.noOptions;
        feedback.classList.add("show");
        resultSection.style.display = "none";
        strengthMeter.style.display = "none";
        setTimeout(() => feedback.classList.remove("show"), 2500);
        return;
    }

    const password = generatePassword(
        passLength,
        includeLowercase,
        includeUppercase,
        includeNumbers,
        includeSymbols
    );

    if (password) {
        passwordResult.value = password;
        resultSection.style.display = "block";
        strengthMeter.style.display = "block";

        // Calculate and display strength
        const strength = calculateStrength(password);
        const strengthLabels = {
            weak: "Weak",
            medium: "Medium",
            strong: "Strong"
        };

        strengthFill.className = `strength-fill ${strength}`;
        strengthText.className = `strength-text ${strength}`;
        strengthText.textContent = strengthLabels[strength];

        // Clear feedback
        feedback.classList.remove("show");
    } else {
        feedback.textContent = feedbackMessages.error;
        feedback.classList.add("show");
        resultSection.style.display = "none";
        strengthMeter.style.display = "none";
    }
});

// Copy 
copyBtn.addEventListener("click", () => {
    const password = passwordResult.value;

    navigator.clipboard.writeText(password).then(() => {
        feedback.textContent = feedbackMessages.success;
        feedback.classList.add("show");

        // Change button appearance temporarily
        const originalText = copyBtn.textContent;
        copyBtn.textContent = "✓ Copied";

        setTimeout(() => {
            feedback.classList.remove("show");
            copyBtn.textContent = originalText;
        }, 2000);
    }).catch(() => {
        feedback.textContent = feedbackMessages.error;
        feedback.classList.add("show");
        setTimeout(() => feedback.classList.remove("show"), 2000);
    });
});

// Generate password on enter key
document.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        generateBtn.click();
    }
});

// Initialize with a default password on load
window.addEventListener("load", () => {
    generateBtn.click();
});