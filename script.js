document.addEventListener("DOMContentLoaded", () => {
    const display = document.getElementById("display");
    const buttons = document.querySelectorAll(".butn");
    const acButton = document.querySelector(".btn"); // "AC" button

    let currentInput = "";
    let openBrackets = 0;

    buttons.forEach(button => {
        button.addEventListener("click", (e) => {
            const value = e.target.innerText;

            if (value === "=") {
                try {
                    // Replace "X" with "*" for multiplication
                    let expression = currentInput.replace(/X/g, "*");

                    // Handle percentage calculations (e.g., 50% -> 50/100)
                    expression = expression.replace(/(\d+)%/g, "($1/100)");

                    // Evaluate the final expression
                    currentInput = eval(expression).toString();
                    display.value = currentInput;
                } catch {
                    display.value = "Error";
                    currentInput = "";
                }
            } else if (value === "C") {
                // Remove the last character
                currentInput = currentInput.slice(0, -1);
                display.value = currentInput;
            } else if (value === "()") {
                // Handle brackets insertion correctly
                if (openBrackets === 0 || /[\+\-\*\/👦]$/.test(currentInput)) {
                    currentInput += "(";
                    openBrackets++;
                } else if (openBrackets > 0) {
                    currentInput += ")";
                    openBrackets--;
                }
                display.value = currentInput;
            } else if (value === "%") {
                // Only allow % if it's after a number
                if (currentInput !== "" && !isNaN(currentInput.slice(-1))) {
                    currentInput += "%";
                    display.value = currentInput;
                }
            } else if (value === ".") {
                // Prevent multiple decimal points in a single number
                let lastNum = currentInput.split(/[\+\-\*\/👦👦]/).pop();
                if (!lastNum.includes(".")) {
                    currentInput += ".";
                    display.value = currentInput;
                }
            } else {
                currentInput += value;
                display.value = currentInput;
            }
        });
    });

    // Fix "AC" button functionality
    acButton.addEventListener("click", () => {
        currentInput = "";
        display.value = "";
        openBrackets = 0;
    });
});
