const Solve = (char) => {
    var sound = document.getElementById("audio");
    sound.play();
    let display = document.getElementById("display");
    display.value += char;
}

const Clear = () => {
    document.getElementById("display").value = "";
}

const Backspace = () => {
    let display = document.getElementById("display");
    display.value = display.value.slice(0, -1);
}

const Result = () => {
    let display = document.getElementById("display");
    let expression = display.value;
    try {
        display.value = eval(expression);
    } catch(err) {
        display.value = "";
        let text = `Error! ${expression} is not a valid expression`;
        document.getElementById("error").value = "Enter a valid string."
    }
}