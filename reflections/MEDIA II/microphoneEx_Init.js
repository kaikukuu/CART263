window.onload = getMicrophoneInput;

async function getMicrophoneInput() {
    console.log("here we are ");

    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    let audioContext = new AudioContext(); //using the web audio library

    // get the canvas
    let canvas = document.getElementById("drawingCanvas");
    //get the context
    let context = canvas.getContext("2d");
    let analyser = audioContext.createAnalyser();


    try {
        //returns a MediaStreamAudioSourceNode.
        let audioStream = await navigator.mediaDevices.getUserMedia({
            audio: true,
        });
        // console.log(audioStream)
        //pass the microphone input to the web audio API
        let microphoneIn = audioContext.createMediaStreamSource(audioStream);
        console.log(microphoneIn);

        const filter = audioContext.createBiquadFilter();
        // microphone -> filter ->  analyzer->destination
        microphoneIn.connect(filter);
        //use the analyzer object to get some properties ....
        filter.connect(analyser);

        visualizeTimeAndFreq();
        function visualizeTimeAndFreq() {
            const WIDTH = 500;
            const HEIGHT = 500;

            analyser.fftSize = 1024; // fft conversion from time to frequency samples
            //console.log (analyser.frequencyBinCount) //half of fft size
            const bufferLength = analyser.fftSize;
            const dataArrayFreq = new Uint8Array(bufferLength); //array

            let drawVisual = requestAnimationFrame(animateVisual);
            function animateVisual() {
                //clear with each frame
                context.fillStyle = "rgb(0 0 0)";
                context.fillRect(0, 0, WIDTH, HEIGHT);

                analyser.getByteFrequencyData(dataArrayFreq);
                //each respective frequency goes in its own bin
                //lowest to highest frequency domain

                /* looking for dominant frequencies*/
                /* higher bars === more dominant frequency  (db)*/

                //each bin represents a given frequency
                //each bin represents a given frequency
                //get only the first
                const barWidth = (WIDTH / bufferLength) * 5;
                let barHeight;
                let x2 = 0;
                for (let i = 0; i < bufferLength; i++) {
                    //frequency value in that bin (more dominant will be higher)
                    console.log(dataArrayFreq[i]);
                    //frequency value in that bin (more dominant will be higher)
                    barHeight = dataArrayFreq[i];
                    context.fillStyle = `rgb(${barHeight + 100} 50 50)`;
                    context.fillRect(x2, HEIGHT - barHeight, barWidth, barHeight);
                    x2 += barWidth + 1;
                }
                drawVisual = requestAnimationFrame(animateVisual);
            }
        }

    }
    catch (err) {
        /* handle the error */
        console.log("had an error getting the microphone");
    }
} 
