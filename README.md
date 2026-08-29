# 🔐 Random Password Generator

A simple and responsive **Random Password Generator** built using **HTML, CSS, and JavaScript**. It allows users to create customized passwords by selecting their desired length and character types.

The project also includes a **password strength indicator** and a **copy-to-clipboard** feature.

## ✨ Features

* 🔢 Choose password length from **4 to 50 characters**
* 🔤 Include **lowercase letters** (`a-z`)
* 🔠 Include **uppercase letters** (`A-Z`)
* 🔢 Include **numbers** (`0-9`)
* 🔣 Include **symbols**
* 📊 Automatic **password strength detection**
* 📋 Copy generated passwords directly to the clipboard
* ⚡ Generate a password instantly
* ⌨️ Press **Enter** to generate a password
* 📱 Responsive design for different screen sizes
* 🎨 Modern dark-themed user interface
* ✨ Smooth animations and interactive UI elements

## 🛠️ Technologies Used

* **HTML5** – Structure of the application
* **CSS3** – Styling, responsive design, gradients, animations, and UI
* **JavaScript** – Password generation, validation, strength calculation, DOM manipulation, and clipboard functionality

## 📂 Project Structure

```text
random-password-generator/
│
├── index.html
├── styles.css
├── script.js
└── README.md
```

## ⚙️ How It Works

The password generator combines the character sets selected by the user.

### Character Sets

```javascript
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+:?>|}<{~";
```

Based on the selected options, the required character sets are added to `allowedChars`.

```javascript
allowedChars += includeLowercase ? lowercaseChars : "";
allowedChars += includeUppercase ? uppercaseChars : "";
allowedChars += includeNumbers ? numberChars : "";
allowedChars += includeSymbols ? symbolChars : "";
```

The program then randomly selects characters from the combined character set until the requested password length is reached.

```javascript
for (let i = 0; i < passLength; i++) {
    const randomIndex = Math.floor(Math.random() * allowedChars.length);
    password += allowedChars[randomIndex];
}
```

## 📊 Password Strength

The generator evaluates the password using several conditions:

* Password length
* Lowercase letters
* Uppercase letters
* Numbers
* Symbols

The password is classified as:

| Strength  | Score      |
| --------- | ---------- |
| 🔴 Weak   | 3 or below |
| 🟠 Medium | 4–5        |
| 🟢 Strong | 6–7        |

For example, a longer password containing uppercase letters, lowercase letters, numbers, and symbols will generally receive a stronger rating.

## 📋 Copy to Clipboard

After generating a password, users can click the **Copy** button.

The project uses the browser's Clipboard API:

```javascript
navigator.clipboard.writeText(password)
```

A feedback message is displayed when the password is successfully copied.

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/random-password-generator.git
```

### 2. Open the project

Navigate into the project folder:

```bash
cd random-password-generator
```

### 3. Run the project

Open `index.html` in your web browser.

No additional dependencies or installation are required.

## 🎯 What I Learned

While building this project, I practiced:

* JavaScript functions
* Function parameters
* Conditional operators
* Strings and string indexing
* `Math.random()`
* `Math.floor()`
* `for` loops
* Regular expressions
* DOM manipulation
* Event listeners
* Form inputs and checkboxes
* The Clipboard API
* CSS variables
* CSS gradients
* CSS animations
* Responsive design
* Git and GitHub project management

## 🔮 Possible Improvements

Some features that could be added in the future:

* 🔒 Use `crypto.getRandomValues()` for stronger randomness
* 📋 Password generation history
* 🎚️ More advanced strength analysis
* 🚫 Option to exclude similar characters such as `0`, `O`, `l`, and `1`
* 🔢 Guarantee at least one character from every selected category
* 🌙 Light/dark theme toggle
* 📤 Export generated passwords
* 🛡️ More detailed password security information

## 📄 License

This project is open source and available for personal and educational use.
