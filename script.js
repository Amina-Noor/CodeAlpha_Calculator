const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

// Handle button clicks
buttons.forEach(button => {
  button.addEventListener("click", () => handleInput(button.textContent));
});

function handleInput(value) {
  if (value === "AC") {
    display.value = "0";
  } else if (value === "⌫") {
    display.value = display.value.slice(0, -1) || "0";
  } else if (value === "=") {
    try {
      display.value = eval(
        display.value
          .replace(/÷/g, "/")
          .replace(/×/g, "*")
          .replace(/−/g, "-")
      );
    } catch {
      display.value = "Error";
    }
  } else {
    if (display.value === "0" || display.value === "Error") {
      display.value = value;
    } else {
      display.value += value;
    }
  }
}

// Keyboard input support
document.addEventListener("keydown", e => {
  const key = e.key;

  if (/[0-9.+\-*/%]/.test(key)) {
    if (display.value === "0" || display.value === "Error") {
      display.value = key;
    } else {
      display.value += key;
    }
  } else if (key === "Enter") {
    e.preventDefault();
    handleInput("=");
  } else if (key === "Escape") {
    handleInput("AC");
  } else if (key === "Backspace") {
    handleInput("⌫");
  }
});
