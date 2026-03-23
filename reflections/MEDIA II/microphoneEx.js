window.onload = setupMicrophoneStart;

function setupMicrophoneStart() {
    const canvas = document.getElementById("drawingCanvas");
    const context = canvas.getContext("2d");

    context.fillStyle = "#FFFFFF";
    context.font = "20px Roboto, sans-serif";
    context.fillText("Click anywhere to start mic", 115, 250);

    // Browsers require a user gesture before audio can run.
    document.body.addEventListener("click", getMicrophoneInput, { once: true });
}

async function getMicrophoneInput() {
    console.log("here we are ");

    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    let audioContext = new AudioContext(); //using the web audio library
    await audioContext.resume();

    // get the canvas
    let canvas = document.getElementById("drawingCanvas");
    //get the context
    let context = canvas.getContext("2d");

    try {
        //returns a MediaStreamAudioSourceNode.
        let audioStream = await navigator.mediaDevices.getUserMedia({
            audio: true,
        });
        // console.log(audioStream)
        //pass the microphone input to the web audio API
        let microphoneIn = audioContext.createMediaStreamSource(audioStream);
        const analyser = audioContext.createAnalyser();
        // microphone -> analyzer
        microphoneIn.connect(analyser);
        analyser.fftSize = 2048;
        let timeDomainData = new Uint8Array(analyser.fftSize);

        //call loop ...
        requestAnimationFrame(animateFrequencies);

        /****our looping callback function */
        function animateFrequencies() {
            context.clearRect(0, 0, canvas.width, canvas.height);
            analyser.getByteTimeDomainData(timeDomainData);

            // RMS around 128 is a stable way to measure mic loudness.
            let sumSquares = 0;
            for (let i = 0; i < timeDomainData.length; i++) {
                let centered = (timeDomainData[i] - 128) / 128;
                sumSquares += centered * centered;
            }
            let rms = Math.sqrt(sumSquares / timeDomainData.length);
            let level = Math.min(1, rms * 6);

            context.fillStyle = "#FF0000";
            const barWidth = Math.max(2, level * (canvas.width - 40));
            context.fillRect(20, canvas.height / 2 - 15, barWidth, 30);

            context.fillStyle = "#FFFFFF";
            context.font = "16px Roboto, sans-serif";
            context.fillText(`Level: ${level.toFixed(3)}`, 20, canvas.height / 2 - 25);

            //call loop ...
            requestAnimationFrame(animateFrequencies);
        }
    } catch (err) {
        /* handle the error */
        console.error("had an error getting the microphone", err);

        const canvas = document.getElementById("drawingCanvas");
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "#FFFFFF";
        context.font = "16px Roboto, sans-serif";
        context.fillText("Mic access failed. Check browser permissions.", 80, 250);
    }
}