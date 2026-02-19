window.onload = setup;
function setup() {
    console.log("events!")

    let section = document.querySelectorAll(".mouseclick-active-section");
    section.forEach(element => {
        element.addEventListener("click", function (e) {
            console.log(this);
            console.log(e)

            //check if is inactive
            if (this.getAttribute("custom-bool") === "inactive") {
                console.log("is inactive");
                console.log(this.id)
                this.setAttribute("custom-bool", "active");
                this.style.opacity = 0.5;
            } else {
                console.log("is active");
                console.log(this.id)
                this.setAttribute("custom-bool", "inactive");
                this.style.opacity = 1.5;
            }


        });

        document.querySelector("#bubbleButton").addEventListener("click", function (e) {
            console.log("Button clicked!");
            let bubble = document.createElement("div");
            bubble.classList.add("bubble");
            bubble.style.left = `${Math.random() * (window.innerWidth - 200)}px`;
            console.log(bubble.style.left);

            bubble.style.top = `${Math.random() * (window.innerHeight - 200)}px`;

            let r = Math.ceil(Math.random() * 255); //new Math.ceil
            let g = Math.ceil(Math.random() * 255);
            let b = Math.ceil(Math.random() * 255);

            bubble.style.background = `rgba(${r},${g},${b})`;
            document.getElementById("top-layer").appendChild(bubble)

        });
    });


    // let practiceSection = document.querySelector("#s1");
    // practiceSection.addEventListener("mousemove",
    //     function (e) {
    //         console.log(this);
    //         console.log(e)

    //         //a:
    //         this.style.background = `rgba(222, 111, 333, 0.5)`
    //     }
    // );

    // let practiceSection2 = document.querySelector("#s2");
    // practiceSection2 .addEventListener("keydown",
    //     function (e) {
    //         console.log(this);
    //         console.log(e)

    //         //a:
    //         this.style.background = `rgba(222, 111, 333, 0.5)`
    //     }
    // );
}
