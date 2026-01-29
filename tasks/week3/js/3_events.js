window.onload = setup;
function setup() {
    console.log("events!")

    let section = document.querySelectorAll(".mouseclick-active-section");
    section.forEach(element => {
        element.addEventListener("click", function (e) {
            console.log(this);
            console.log(e)
            this.style.opacity = 0.5;
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
