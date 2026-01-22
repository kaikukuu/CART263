window.onload = setup
function setup() {
    console.log("running setup");

    // // // Note: document.getElementById() returns ONLY the 1st element it encounters in the DOM tree with the matching ID.Ensure that all your elements have unique ID's (if you are using them to access in js).
    // // console.log(document.getElementById("one"));

    // // // Note that - the document.querySelect() function ALWAYS returns the first match found.
    // // console.log(document.querySelector("#one"));

    // // // Note: Even if there is only one element with that tag name, Javascript will return a list(array) with one element in it.
    // // console.log(document.getElementsByTagName("div"));

    // // // And then since what is being returned is an array: we use array syntax to access:

    // // console.log(document.getElementsByTagName("div").length);

    // // console.log(document.getElementsByTagName("div")[0]);

    // // // If we want to NOT return an array - and for some reason only want to return the first match we could use document.querySelect() i.e.:

    // // console.log(document.querySelector("div"));

    // console.log(document.querySelectorAll("div"));
    // console.log(document.querySelectorAll("div").length);
    // console.log(document.querySelectorAll("div")[0]);

    // console.log(document.getElementsByClassName("square_shape"));
    // console.log(document.getElementsByClassName("square_shape").length);
    // console.log(document.getElementsByClassName("square_shape")[0]);

    // // And again if we want to NOT return an array - and for some reason only want to return the first match we could use document.querySelect() i.e.:

    // console.log(document.querySelector(".square_shape"));

    // //generic class selector that returns ALL matches:
    // console.log(document.querySelectorAll(".square_shape"));
    // console.log(document.querySelectorAll(".square_shape").length);
    // console.log(document.querySelectorAll(".square_shape")[0])

    // // innerHTML holds a ref to the HTML container within an element allowing us to easily access or change it:
    // console.log(document.getElementById("two").innerHTML);
    // // textContent holds a ref to the TEXT content within an element allowing us to easily access or change it:
    // console.log(document.getElementById("two").textContent);
    // //(note on above: In summary: the textContent property outputs text/plain while .innerHTML outputs text/html. * Output of type text/plain is not parsed by the browser and results in the full content displaying. * Output of the type text/html tells the browser to parse it before displaying it.)

    // //Access Attributes of elements

    // // getAttribute() method returns the value of a specified attribute on the element
    // console.log(document.querySelector("#five").getAttribute("id"));
    // console.log(document.querySelector("#five").getAttribute("class"));

    // // setAttribute() method sets the value of a specified attribute on the element
    // console.log(document.querySelector("#two").getAttribute("class"));
    // console.log(typeof (document.querySelector("#two").getAttribute("class")));

    // // querySelector().classList property returns the class name(s) of an element as a DOMTokenList object which is similar to an array but has some additional properties/methods
    // console.log(document.querySelector("#two").classList);

    // // to get all attribute names of an element, we can use the getAttributeNames() method which returns an array of attribute names
    // console.log(document.querySelector("#five").getAttributeNames());

    // //Access style attributes of elements

    // // the style property allows us to access the inline styles of an element as a CSSStyleDeclaration object
    // console.log(document.querySelector("#one").style);
    // console.log(document.querySelector("#one").style.background);
    // onsole.log(document.querySelector("#six").style);
    // console.log(document.querySelector("#six").style.background);
    // console.log(document.querySelector("#six").style.width);

    // //Modifying DOM elements
    // //     Not only can we access properties of elements - we can also alter them ... though remember the changes you make to the document are not persistent...

    // // Parents and Children
    // // Before doing that -> there are two properties that are super useful.The.parentElement property when applied to an HTML element will return the immediate parent of that element.The following example will return the parent of the first span element:


    // console.log(document.querySelectorAll("span")[0].parentElement)

    // // Note: we can get ancestors of elements by chaining ...i.e..parentElement.parentElement returns the immediate grandparent etc ...

    // console.log(document.querySelectorAll("span")[0].parentElement.parentElement)

    // // In contrast, the.children property returns all the immediate children as an iterable list of a given element:

    // console.log(document.querySelector(".wrapper_flex_box").children)

    // // And to get the first one:

    // console.log(document.querySelector(".wrapper_flex_box").children[0])

    // // Modify the HTML content:
    // //     Ok - so now lets modify html content of a given element:

    // document.querySelector("#two").children[0].innerHTML = "<h2> this is now a header</h2>";

    // Modify the TEXT content
    // Changing the text content is pretty much the same idea... so instead of changing one element: lets here demonstrate changing a group of elements all at once:


    //get the group
    let allSquareShapes = document.querySelectorAll(".square_shape");
    //go through each element
    for (let singleSquareShape of allSquareShapes) {
        //get children
        console.log(singleSquareShape.children[0])
        singleSquareShape.children[0].textContent += "adding content"
    }

    // And note ... that we can use more complex patterns using the querySelector() or querySelectorAll() i.e:

    //get the group
    let allSquareShapes = document.querySelectorAll(".square_shape");
    //go through each element
    for (let singleSquareShape of allSquareShapes) {
        //get children
        if (singleSquareShape.querySelector("p span") !== null) {
            singleSquareShape.querySelector("p span").textContent += " other Content"
        }
    }

    // Modify attributes
    //First: adding / removing from the classList:

    document.querySelector(".square_shape").classList.remove("square_shape"); //first one only
    document.querySelector("p span").classList.add("change_span");

    // Second: modifying attributes using the setAttribute() method

    document.querySelectorAll(".another_class")[0].setAttribute("id", "newTest");
    console.log(document.querySelectorAll(".another_class")[0]);

    // Third: remove attributes using the removeAttribute() method i.e.:

    //second elements grandparent
    let element = document.querySelectorAll("span")[1].parentElement.parentElement
    element.removeAttribute("id")
    console.log(element)

    // Fourth: let's dynamically change the style attribute of an element. Note that you can either add anew or modify:

    //add
    document.querySelector("#four").style.background = "cornflowerBlue";
    document.querySelector("#four").style.borderColor = "darkblue";
    //modify
    document.querySelector("#one").style.background = "pink";
    document.querySelector("#one").style.borderColor = "darkblue";

    // Adding elements to the DOM

    // First create the element(element node): using the createElement() method.
    // Then append this new element to an existing element.

    // The following example demonstrates the appendChild() method which adds the element at the end of the parent.Then, the next example will demonstrate the insertBefore() method which adds the new element before an existing element.First: comment out all the example code within the setup().Then add the following:

    //two steps to add a new element to the DOM:

    //new element
    let newDiv = document.createElement("div");
    newDiv.classList.add("square_shape");
    newDiv.innerHTML = " NEW ELEMENT ";
    newDiv.style.backgroundColor = "purple";
    // access parent element
    let parentElement = document.querySelector(".wrapper_flex_box")
    parentElement.appendChild(newDiv)

    // then:

    let newDivTwo = document.createElement("div");
    newDivTwo.classList.add("square_shape");
    newDivTwo.innerHTML = " NEW ELEMENT TWO ";
    newDivTwo.style.backgroundColor = "yellow";
    newDivTwo.querySelector("p").style.color = "black"
    // access parent element
    let sibling = document.querySelector("#three")
    let parentElementAgain = document.querySelector(".wrapper_flex_box")
    parentElementAgain.insertBefore(newDivTwo, sibling);

    // Removing elements from the DOM
    // to remove an element - you need to access the parent element first - then call removeChild() on that parent element - passing in the element to be removed as the argument:

    let parentElementToRemoveFrom = document.querySelector(".wrapper_flex_box")
    let toRemove = document.getElementById("six");
    parentElementToRemoveFrom.removeChild(toRemove);

}
