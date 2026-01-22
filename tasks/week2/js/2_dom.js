window.onload = setup
function setup() {
    console.log("running setup");

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

    // //get the group
    // let allSquareShapes = document.querySelectorAll(".square_shape");
    // //go through each element
    // for (let singleSquareShape of allSquareShapes) {
    //     //get children
    //     if (singleSquareShape.querySelector("p span") !== null) {
    //         singleSquareShape.querySelector("p span").textContent += " other Content"
    //     }
    // }



}
