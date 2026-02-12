window.onload = function () {
    console.log("in local storage ex");

    let theButtons = document.getElementsByClassName("titleBar");
    for (let i = 0; i < theButtons.length; i++) {
        theButtons[i].addEventListener("click", saveStateHandler);
    }

    // the callback function
    function saveStateHandler(event) {
        console.log(this.parentElement); // get parent element
        let buttonID = this.parentElement.id;
        let inputValue = this.parentElement.querySelector("input").value;
        console.log(inputValue);
    }

    if (inputValue !== "") {
        // save the value to local storage -> NOTE it is saved a key-value pair
        localStorage.setItem(buttonID, inputValue);
        //reset input val
        inputValue = "";
    }
    let valueA = localStorage.getItem("a");
    console.log(valueA);

};
