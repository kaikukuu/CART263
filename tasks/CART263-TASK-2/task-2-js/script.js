window.onload = setup;
//

/** function setup */
function setup() {
    console.log("we are a go!")
    /*** ALL ANWSERS TO BE ADDED IN THE ALLOCATED SPACE */
    /*** START PART ONE ACCESS */
    /* 1: all paragraph elements */
    /***CODE */

    //get all paragraph elements
    let allParagraphs = document.getElementsByTagName("p");
    console.log(allParagraphs);

    /***OUTPUT: 
     * HTMLCollection(9) [p#1, p#2.img-descript, p#3.img-descript, p#4.img-descript, p#5.img-descript, p#6.img-descript, p#7.img-descript, p#8.img-descript, p#9.img-descript]0: p#11: p#2.img-descript2: p#3.img-descript3: p#4.img-descript4: p#5.img-descript5: p#6.img-descript6: p#7.img-descript7: p#8.img-descript8: p#9.img-descript9: <value unavailable>length: 9[[Prototype]]: HTMLCollection

     */


    /*************************************** */
    /* 2: only the first paragraph element */
    /***CODE */

    //get the first paragraph element
    console.log(document.getElementsByTagName("p")[0]);

    /***OUTPUT: 
     * 
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias perspiciatis blanditiis, et
                laborum praesentium earum. Enim facere, quia commodi voluptate, quis asperiores, pariatur ducimus
                officiis non
                quasi officia sit veniam!
            
     */


    /*************************************** */
    /* 3: all elements with the class inner-container */
    /***CODE */

    console.log(document.getElementsByClassName("inner-container"));
    /***OUTPUT: 
     * 
     * HTMLCollection(8) [div.inner-container, div.inner-container, div.inner-container, div.inner-container, div.inner-container, div.inner-container, div.inner-container, div.inner-container]
     */


    /*************************************** */
    /* 4: the last image element inside the element that has the class img-container */
    /***CODE */
    //get all elements with class name img-container
    let imgContainers = document.getElementsByClassName("img-container");
    //get the last image element inside the last img-container array
    let lastImg = imgContainers[imgContainers.length - 1].getElementsByTagName("img");
    console.log(lastImg[lastImg.length - 1]);

    /***OUTPUT: 
     * <img class="img-image" src="task-2-images/seventeen.png">
     */


    /*************************************** */
    /* 5A: all h2 elements */
    /* 5B: length of the list in 5A */
    /* 5C: the text content of the first element in the list from 5A */
    /***CODE */
    let allH2 = document.getElementsByTagName("h2");
    console.log(allH2);
    console.log(allH2.length);
    console.log(allH2[0].textContent);
    /***OUTPUT: 
     * HTMLCollection [h2]0: h2length: 1[[Prototype]]: HTMLCollection

     */


    /*************************************** */
    /* 6: the element with id name parent */
    /***CODE */
    console.log(document.getElementById("parent"));
    /***OUTPUT: 
     * script.js:6 we are a go!
        <section id=​"parent">​flex<div class=​"inner-container">​…​</div>​<div class=​"inner-container">​…​</div>​<div class=​"inner-container">​…​</div>​<div class=​"inner-container">​…​</div>​<div class=​"inner-container">​…​</div>​<div class=​"inner-container">​…​</div>​<div class=​"inner-container">​…​</div>​<div class=​"inner-container">​…​</div>​</section>​
     */

    /*************************************** */
    /*** END PART ONE ACCESS */


    /*************************************** */
    /*** START PART TWO MODIFY */
    /*************************************** */
    /* 1: Select the first paragraph and replace the text within the paragraph... */

    document.getElementsByTagName("p")[0].textContent = "This text content has been changed for the first paragraph.";

    /***CODE */
    /*************************************** */
    /* 2: Select all elements in the HTML that have the class name content-container
     and change the background color ... of first and second ...*/
    /***CODE */
    let contentContainer1 = document.getElementsByClassName("content-container")[0];
    let contentContainer2 = document.getElementsByClassName("content-container")[1];
    contentContainer1.style.backgroundColor = "lightblue";
    contentContainer2.style.backgroundColor = "lightgreen";

    /*************************************** */
    /* 3: Change the src element of the first image element on the page to be ...
    /***CODE */
    document.getElementsByClassName("img-image")[0].src = "task-2-images/ten.png";

    /*************************************** */
    /* 4: Select the third paragraph element on the page and 
    replace the content (within the paragraph) to be an h2 element which contains the text `TEST 123`
    /***CODE */
    document.getElementsByTagName("p")[2].innerHTML =
        "<h2>TEST 123</h2>";


    /*************************************** */
    /* 5: Select the fourth paragraph element on the page and 
    add to the existing content an h2 element containing the text `TEST 123`
    /***CODE */
    document.getElementsByTagName("p")[3].innerHTML =
        "<h2>TEST 123</h2>" + document.getElementsByTagName("p")[3].innerHTML;

    /*************************************** */
    /* 6: Select the fifth paragraph element on the page and add to the existing content 
    an img element that holds `one.png`, and add the class newStyle to said paragraph element.
    /***CODE */
    document.getElementsByTagName("p")[4].innerHTML += "<img src='task-2-images/one.png'>";
    document.getElementsByTagName("p")[4].classList.add("newStyle");
    console.log(document.getElementsByTagName("p")[4]);
    console.log(document.getElementsByTagName("p")[4].classList);


    /*************************************** */
    /* 7: Add the following array variable: let colors = ['red','blue','green','orange'];, 
    then access all elements with class name inner-container and save to a variable called `innerContainers`. 
    Next, iterate over the colors array, and for each color: 
    assign the element from innerContainers variable with the same index 
    (i.e. colors[0] should be allocated to the first innerContainers element, colors[1] to the second, etc ...) 
    a background using that color.
    /***CODE */
    let colors = ['red', 'blue', 'green', 'orange'];
    let innerContainers = document.getElementsByClassName("inner-container");
    for (let i = 0; i < colors.length; i++) {
        innerContainers[i].style.backgroundColor = colors[i];
    }

    /*************************************** */
    /*** END PART TWO MODIFY */


    /*************************************** */
    /*** START PART THREE CREATE */
    /*************************************** */
    /* 1: NEW PARAGRAPHS */
    /* 1A: Access all paragraph elements, and store the result in a variable called: allPTagsThree */
    /* 1B: Create a function:function customCreateElement(parent){ //body } */
    /* 1C:  In the body of customCreateElement create a new parargraph element*/
    /* 1D:  Set the text of this element to be : `using create Element`*/
    /* 1E:  Set the background of this paragraph element to be green */
    /* 1F:  Set the color of the text in this paragraph element to be white */
    /* 1G: Append this new element to the parent variable within the function. */
    /* 1H: Iterate through the allPTagsThree array and call customCreateElement(), passing the current allPTagsThree element as the parent with each iteration.*/
    /***CODE */
    allPTagsThree = document.getElementsByTagName("p");

    function customCreateElement(parent) {
        //body 
        let newParagraph = document.createElement("p");
        newParagraph.textContent = "using create Element";
        newParagraph.style.backgroundColor = "green";
        newParagraph.style.color = "white";
        parent.appendChild(newParagraph);
    }

    for (let i = 0; i < allPTagsThree.length; i++) {
        customCreateElement(allPTagsThree[i]);
    }

    /***EXPLANATION::
     * First we access all paragraph elements "p" and store them in a variable called allPTagsThree that can be accessed as an array/an iterable object.
     * Then we create a function called customCreateElement that takes a parent element as an argument and creates a new paragraph element with specified text and styles.
     * Inside the function, we create a new paragraph element using document.createElement("p"), set its text content to "using create Element", set its background color green, and text color to white. Ultimately, we append this new paragraph element to the parent element passed as an argument.
     * 
     * We then iterate through the allPTagsThree array and call the customCreateElement function for each paragraph element, passing the current paragraph as the parent.
     *
     *result: Each paragraph element on the page will have a new paragraph appended to it with the specified text and styles.

    /*************************************** */
    /* 2: GRID OF BOXES */
    /* 2A: Create another new function: function customNewBoxCreate(parent){ //body }*/
    /* 2B: In the body of customNewBoxCreate create a new div element, that has the class testDiv.
    /* 2C:Then append this new element to the parent variable within the function. 
    /* 2D:Finally, return</code> this new element */
    /* 2E:Create a nested for loop (for rows and columns) to iterate through 10 columns and 10 rows (just like the JS Review :)). 
        Call the customNewBoxCreate function, in order to generate a new div -> representing each cell in the grid. 
        Ensure that the parent element for each of these new divs is the element whose id is named `new-grid`*/
    /* 2F: You will see at this point that the x,y position of the resulting divs makes no sense... 
        Fix this by doing the following: every time you call customNewBoxCreate() - save the current returned element 
        in a variable i.e. returnedDiv. 
        Set the style (left and top) to the of this element to 
        the necessary x and y position (use the counter variables in the for nested for loop to 
        calculate the new positions.
    /* 2G: BONUS I: Make every div in the resulting grid in an even numbered row have white background 
        and otherwise let it have a background of purple.</li>
    /* 2H: BONUS II: For every div in an even numbered row make it contain the text `EVEN`, 
        otherwise lat it have the content `ODD`.*/

    /***CODE */
    function customNewBoxCreate(parent) { //body 
        let newDiv = document.createElement("div");
        newDiv.className = "testDiv";
        parent.appendChild(newDiv);
        return newDiv;
    }
    for (i = 0; i < 10; i++) {
        for (j = 0; j < 10; j++) {
            let returnedDiv = customNewBoxCreate(document.getElementById("new-grid"));
            returnedDiv.style.left = (j * 22) + "px";
            returnedDiv.style.top = (i * 22) + "px";

            //BONUS I and II 
            if (i % 2 === 0) {
                returnedDiv.style.backgroundColor = "white";
                returnedDiv.textContent = "EVEN";
            } else {
                returnedDiv.style.backgroundColor = "purple";
                returnedDiv.textContent = "ODD";
            }
        }
    }

    /***EXPLANATION::
     * Reference for code and concepts used:
     * https://codesignal.com/learn/courses/web-development-with-html-css-and-javascript/lessons/interactive-web-development-with-javascript-and-dom
     *
     * first we create a function called customNewBoxCreate that takes a parent element as an argument and creates a new div element with the class name "testDiv".
     * Inside the function, we create a new div element using document.createElement("div"), set its class name to "testDiv", append it to the parent element passed as an argument, and return the new div element.
     *
     * Next, we create a nested for loop to iterate through 10 rows and 10 columns. In each iteration of the inner loop, we call the customNewBoxCreate function, passing the element with the id "new-grid" as the parent.
     * We then set the left and top styles of the returned div element to position it correctly in the grid based on the current row (i) and column (j) indices.
     *
     * For the bonus tasks, we check if the current row index (i) is even or odd using the modulo operator (%). If it's even, i=0, we set the background color of the div to white and its text content to "EVEN". If it's odd, i=1, we set the background color to purple and its text content to "ODD".
     */
    /*************************************** */
    /* 3: GRID OF BOXES II */
    /* 3A: Create ANOTHER nested for loop - in order to generate a new grid ...
        USE the same customNewBoxCreate function..., the only difference is that the parent element
        for each of these new divs is the element whose id is `new-grid-three`. */
    /* 3B: Then: write the code to check when a column is a multiple of 3 (no remainder),when it is a column where the remainder is 1 or when the remainder is 2 ...
        HINT:: look up the % operator.. */
    /* 3C: Then for each of the above cases: give the new divs in the first case a background of red,
            then the second a background of orange and the third yellow. */
    /*  3D: Finally, let each div contain the text content representing the associated remainder
        when dividing by three. */
    /***CODE */
    //if i%3 ==0 ... , else if i%3 ==1 ... , else ... if i%3 ===2 ...
    function customNewBoxCreate(parent) {
        let newDiv = document.createElement("div");
        newDiv.className = "testDiv";
        parent.appendChild(newDiv);
        return newDiv;
    }
    for (i = 0; i <= 10; i++) {
        for (j = 0; j < 10; j++) {
            let returnedDiv = customNewBoxCreate(document.getElementById("new-grid"));

            let returnedDivThree = customNewBoxCreate(document.getElementById("new-grid-three"));
            returnedDivThree.style.left = (j * 22) + "px";
            returnedDivThree.style.top = (i * 22) + "px";

            if (i % 3 === 0) {
                returnedDiv.style.backgroundColor = "white";
                returnedDiv.textContent = "remainder: 0";
            } else if (i % 3 === 1) {
                returnedDiv.style.backgroundColor = "purple";
                returnedDiv.textContent = "remainder: 1";
            } else {
                returnedDiv.style.backgroundColor = "blue";
                returnedDiv.textContent = "remainder: 2";
            }
        }
    }

    /***EXPLANATION::
     * Similar to the previous grid of boxes, we create a nested for loop to generate a grid of div elements.
     * We use the same customNewBoxCreate function to create new div elements, but this time we append them to the element with the id "new-grid-three".
     * Inside the nested loop, we check the remainder of the row index (i) when divided by 3 using the modulo (%) operator to determine the background color and text content of each div.
     * 
     */

    /*************************************** */
    /*** END PART THREE CREATE */
    /*************************************** */





}