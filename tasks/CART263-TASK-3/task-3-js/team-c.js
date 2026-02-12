setup_C();
/** THEME: SERENITY  */
function setup_C() {
  console.log("in c");
  /**************************************************** */
  //get the buttons
  activateButtons(`#TEAM_C`, "ani_canvC", aniA, aniB, aniC, aniD);

  /**************** ANI A ************************************ */
  /** PUT ALL YOUR CODE FOR INTERACTIVE PATTERN A INSIDE HERE */
  /**************** ANI A ************************************ */
  /**************** TASK *******************************************
   * YOU CAN USE ALL NOTES --- and see my examples in team-h.js for inspiration and possibly help:)
   * 1: create a creative, visual pattern using text, divs as shapes, images ...
   * 2: add in mouseclick event listener(s) somewhere to make the sketch interactive
   *
   * NOTE::: PLEASE::: if you add any custom css PLEASE use the style.css and prefix any class names with your team label
   * i.e. you want to create a custom div class and you are in "Team_A" then call your class TEAM_A_ANI_A_Div -
   * this is so that your styles are not overriden by other teams.
   * NOTE::: All your code is to be added here inside this function  -
   * remember you can define other functions inside....
   * Do not change any code above or the HTML markup.
   * **/

  function aniA(parentCanvas) {
    let randomColors = [
      "azure",
      "cornflowerblue",
      "darkblue",
      "lightblue",
      "lightsteelblue",
    ]
    parentCanvas.style.backgroundColor = "rgb(199, 219, 255)";

    //get the rendered bounding Box of parent and use the width and height
    let boundingBoxParent = parentCanvas.getBoundingClientRect();
    let arrayOfellipses = [];

    //make a grid of cells
    for (let i = 38; i < boundingBoxParent.width; i += 50) {
      for (let j = 38; j < boundingBoxParent.height; j += 50) {
        //create a div and place in the grid
        let ellipse = document.createElement("div");
        ellipse.classList.add("TEAM_H_h_cell_D");
        parentCanvas.appendChild(ellipse);
        ellipse.style.left = `${j}px`;
        ellipse.style.top = `${i}px`;
        ellipse.style.width = "20px";
        ellipse.style.height = "20px";
        ellipse.style.opacity = 1;
        ellipse.style.background = "blue";
      }
    }

    let clickThree = document.querySelector("#TEAM_C");
    clickThree.addEventListener("click", function (e) {
      //parentCanvas.style.backgroundColor = "red";
      //ellipse.style.background = "red";
    });

    let allSections = document.querySelectorAll(".TEAM_H_h_cell_D");
    //go through each section and apply the event listener
    for (let element of allSections) {
      element.style.background =
        randomColors[parseInt(Math.random() * randomColors.length)]
    }
  }



  /****************ANI B ************************************ */
  /** PUT ALL YOUR CODE FOR INTERACTIVE PATTERN B INSIDE HERE */
  /****************ANI B ************************************ */
  /**************** TASK *******************************************
   * YOU CAN USE ALL NOTES --- and see my examples in team-h.js for inspiration and possibly help:).
   * 1: create a creatve, visual pattern using text, divs as shapes, images ... 
   * 2: add in mouseover event listener(s) somewhere to make the sketch interactive
   *
   * NOTE::: PLEASE::: if you add any custom css PLEASE use the style.css and prefix any class names with your team label
   * i.e. you want to create a custom div class and you are in "Team_A" then call your class TEAM_A_ANI_A_Div -
   * this is so that your styles are not overriden by other teams.
   * NOTE::: All your code is to be added here inside this function -
   * remember you can define other functions inside....
   * Do not change any code above or the HTML markup.
   * **/

  function aniB(parentCanvas) {
    console.log("in ani-B -teamC");

    let canvasB = document.getElementById("ani_canvC_B");
    // adding a color background
    canvasB.style.background = "#566b99";

    // array of symbols for the pattern
    let symbols = ["*", "^", ":", "°", "¤", "~", "_", "=", "‡", "¥", "•", "¿"]

    symbolPattern();

    function symbolPattern() {
      //offset 
      let offset = 50;
      //make a grid of symbol 
      for (let i = 0; i < 12; i++) {
        for (let j = 0; j < 12; j++) {
          // making the symbol random
          let random = Math.floor(Math.random() * symbols.length);
          // console.log(random);
          let newSymbol = symbols[random];
          // console.log(newSymbol);

          //create symbol using p
          let symbolP = document.createElement("p");
          let symbolText = document.createTextNode(newSymbol);
          //class css (I ADDED A CSS CLASS :D !)
          symbolP.classList.add("TEAM_C_b_cell");
          symbolP.style.marginTop = "-40px";
          symbolP.style.marginLeft = "-43px";
          symbolP.style.height = "30px";
          symbolP.style.width = "30px";
          symbolP.style.borderStyle = "none";
          symbolP.style.left = offset + i * 30 + "px";
          symbolP.style.top = offset + j * 30 + "px";
          symbolP.style.background = "#9ac1de";

          parentCanvas.appendChild(symbolP);
          symbolP.appendChild(symbolText);

          //add event listener to each p (realised it was supposed to be a div, I hope it's fine I did it with a "p")
          let hoverSymbol = symbols[j];
          symbolP.addEventListener("mousemove", function (e) {
            this.style.background = "#566b99";
            this.style.color = "#9ac1de";
            this.textContent = hoverSymbol;

          })
        }
      }
    }
  }
  /****************ANI C ************************************ */
  /** PUT ALL YOUR CODE FOR INTERACTIVE PATTERN C INSIDE HERE */
  /****************ANI C************************************ */
  /**************** TASK *******************************************
   * YOU CAN USE ALL NOTES --- and see my examples in team-h.js for inspiration and possibly help:)
   * 1: use the PROVIDED keyup/down callbacks `windowKeyDownRef` and/or `windowKeyUpnRef` to handle keyboard events
   * 2: create an interactive pattern/sketch based on keyboard input. Anything goes.
   * 
   * NOTE::: PLEASE::: if you add any custom css PLEASE use the style.css and prefix any class names with your team label
   * i.e. you want to create a custom div class and you are in "Team_A" then call your class TEAM_A_ANI_A_Div -
   * this is so that your styles are not overriden by other teams.
   * NOTE::: All your code is to be added here inside this function -
   * remember you can define other functions inside....
   * Do not change any code above or the HTML markup.
   * **/

  /* TASK: make an interactive pattern .. colors, shapes, sizes, text, images....
   * using  ONLY key down and/or keyup -- any keys::
   */

  function aniC(parentCanvas) {
    console.log("in ani-C -teamC");

    //set background color  of canvas
    parentCanvas.style.backgroundColor = "rgb(47, 83, 175)";
    let symbols = ["/", "<", ">", "@", "#", "$", "%", "&", "*", "+", "?"];

    /*** THIS IS THE CALLBACK FOR KEY DOWN (* DO NOT CHANGE THE NAME *..) */
    windowKeyDownRef = function (e) {
      //code for key down in here
      console.log(e);
      console.log("c-down");

      //add a new symbol when we press enter
      if (e.code === "Enter") {
        console.log("c-enter down");
        let newSymbol = document.createElement("span");
        let randomIndex = Math.floor(Math.random() * symbols.length);

        newSymbol.textContent = symbols[randomIndex];
        newSymbol.classList.add("TEAM_C_c_symbol");
        parentCanvas.appendChild(newSymbol);

        // newSymbol.style.color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        //   Math.random() * 256
        // )}, ${Math.floor(Math.random() * 256)})`;
        // newSymbol.style.fontSize = `${Math.floor(Math.random() * 40) + 10}px`;

        // newSymbol.style.left = `${Math.floor(Math.random() * parentCanvas.clientWidth)}px`;
        // newSymbol.style.top = `${Math.floor(Math.random() * parentCanvas.clientHeight)}px`;

        //end printing symbols after a certain symbols
        if (parentCanvas.childElementCount > 485) {
          parentCanvas.removeChild(parentCanvas.firstChild);
        }
      }
      //change bg color on shift key
      if (e.code === "ShiftLeft" || e.code === "ShiftRight") {
        console.log("c-shift down");
        let r = Math.floor(Math.random() * 10);
        let g = Math.floor(Math.random() * 10);
        let b = Math.floor(Math.random() * 256);
        parentCanvas.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
      }

      //clear all symbols on backspace
      if (e.code === "Backspace") {
        console.log("c-backspace down");
        parentCanvas.innerHTML = "";
      }

      if (e.code === "ArrowUp") {
        console.log("c-up arrow");
        parentCanvas.style.transform = "rotate(90deg)";
      }
      if (e.code === "ArrowDown") {
        console.log("c-down arrow");
        parentCanvas.style.transform = "rotate(270deg)";
      }
      if (e.code === "ArrowLeft") {
        console.log("c-left arrow");
        parentCanvas.style.transform = "rotate(180deg)";
      }
      if (e.code === "ArrowRight") {
        console.log("c-right arrow");
        parentCanvas.style.transform = "rotate(0deg)";
      }
    };

    /*** THIS IS THE CALLBACK FOR KEY UP (*DO NOT CHANGE THE NAME..) */
    windowKeyUpRef = function (e) {
      console.log(e);
      console.log("c-up");

      //example for enter key up
      if (e.code === "Enter") {
        console.log("c-enter up");

        // parentCanvas.style.backgroundColor = "rgb(47, 83, 175)";
        parentCanvas.style.transition = "background 3s";
        let r = Math.floor(Math.random() * 10);
        let g = Math.floor(Math.random() * 10);
        let b = Math.floor(Math.random() * 256);
        parentCanvas.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;


      }
    };
    //DO NOT REMOVE
    window.addEventListener("keydown", windowKeyDownRef);
    window.addEventListener("keyup", windowKeyUpRef);
  }

  /****************ANI D************************************ */
  /** PUT ALL YOUR CODE FOR INTERACTIVE PATTERN D INSIDE HERE */
  /****************ANI D************************************ */
  /**************** TASK *******************************************
   * YOU CAN USE ALL NOTES --- and see my examples in team-h.js for inspiration and possibly help:).
   * 1: create a creative, visual pattern using text, divs as shapes, images ...
   * 2: add in animation using requestAnimationFrame somewhere to make the sketch animate :)
   *
   * NOTE::: PLEASE::: if you add any custom css PLEASE use the style.css and prefix any class names with your team label
   * i.e. you want to create a custom div class and you are in "Team_A" then call your class TEAM_A_ANI_A_Div -
   * this is so that your styles are not overriden by other teams.
   * NOTE::: All your code is to be added here inside this function -
   * remember you can define other functions inside....
   * Do not change any code above or the HTML markup.
   * **/
  function aniD(parentCanvas) {
    console.log("in ani-D -teamC");

    parentCanvas.style.position = "relative";
    parentCanvas.style.overflow = "hidden";
    let boundingBoxParent = parentCanvas.getBoundingClientRect();
    let arrayOfStars = [];

    //Set the background color of canvas
    parentCanvas.style.background = "black";
    parentCanvas.style.position = "relative";
    //create and place 50 stars randomly on the canvas and give them random velocities
    for (let i = 0; i < 50; i++) {
      let star = document.createElement("div");
      star.classList.add("TEAM_C_d_star");
      //get the rendered bounding Box of parent and use the width and height to position the stars randomly within the parent
      star.style.left = `${Math.random() * boundingBoxParent.width}px`;
      star.style.top = `${Math.random() * boundingBoxParent.height}px`;

      parentCanvas.appendChild(star);

      //create an object to hold the opacity of the star and its velocity and push it to the array of stars
      arrayOfStars.push({
        element: star,
        vx: Math.random() * 2 - 1,
        vy: Math.random() * 2 - 1,
        opacity: Math.random()
      });

    }

    //animate the stars by updating their position based on their velocity in a callback function for requestAnimationFrame
    function animate() {
      for (let i = 0; i < arrayOfStars.length; i++) {
        let p = arrayOfStars[i];

        let currentX = parseFloat(p.element.style.left);
        let currentY = parseFloat(p.element.style.top);

        p.element.style.left = currentX + p.vx + "px";
        p.element.style.top = currentY + p.vy + "px";
      }

      window.requestAnimationFrame(animate);
    }

    window.requestAnimationFrame(animate);
  }

  //   let boundingBoxParent = parentCanvas.getBoundingClientRect();
  //   let arrayOfStars = [];

  //   //set background color  of canvas
  //   parentCanvas.style.background = "black";

  //   //create 50 stars
  //   for (let i = 0; i < 50; i++) {
  //     let star = document.createElement("div");
  //     star.classList.add("TEAM_C_d_star");
  //     star.style.left = `${Math.random() * boundingBoxParent.width}px`;
  //     star.style.top = `${Math.random() * boundingBoxParent.height}px`;
  //     parentCanvas.appendChild(star);

  //     //create an object to hold the opacity of the star and its velocity
  //     let p = {
  //       element: star,
  //       vx: Math.random() * 2 - 1, //velocity x
  //       vy: Math.random() * 2 - 1, //velocity y
  //       starOpacity: Math.random(),

  //     };
  //     arrayOfStars.push(p);
  //   }

  //   //return the array of stars
  //   return arrayOfStars;


  // }
  // parentCanvas.requestAnimationFrame(animate);

  // /****** callback for requestAnimationFrame **********/
  // function animate() {

  //   //
  //   let pArray = aniD(document.getElementById("ani_canvC"));
  //   for (let i = 0; i < pArray.length; i++) {
  //     let p = pArray[i];
  //     //update position
  //     let currentX = parseFloat(p.element.style.left);
  //     let currentY = parseFloat(p.element.style.top);
  //     p.element.style.left = currentX + p.vx + "px";
  //     p.element.style.top = currentY + p.vy + "px";
  //   }

  //   window.requestAnimationFrame(animate);
  //   checkBounds(document.getElementById("parent"), p);
  // }
  // //recall animation loop
  // requestAnimationFrame(animate);
}
