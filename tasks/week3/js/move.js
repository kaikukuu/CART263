window.onload = function () {
    console.log("move");


    let drawBox = document.querySelector("#draw-box-a");

    //add event listener + callback
    drawBox.addEventListener("mousemove", moveCallBack);

    function moveCallBack(e) {
        console.log("mouse move");

        // drawBox.innerHTML = `X: ${e.clientX} Y: ${e.clientY}`; 


        let rect = this.getBoundingClientRect();
        console.log(rect);
        //DIFFERENCE TO ENSURE COORDS ARE RELATIVE
        let offsetX = e.clientX - rect.x;
        let offsetY = e.clientY - rect.y;
        // drawBox.innerHTML = `x: ${offsetX}, y:${offsetY}`;

        let pointDiv = document.createElement("div");
        pointDiv.classList.add("point");
        pointDiv.style.left = offsetX + "px";
        pointDiv.style.top = offsetY + "px";
        this.appendChild(pointDiv);
    }







}