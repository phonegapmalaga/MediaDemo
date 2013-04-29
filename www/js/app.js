$.when(pgReady, jqmReady).then(function() {

    var audioMedia = null,
        audioTimer = null,
        duration = -1;
        paused = false,
        srcAudio = "audio.m4a";
   
    // update ui
    function updateUI() {
        audioMedia.getCurrentPosition(
            function(position){
                if (position > -1) {
                    var rounded = Math.round(position);
                    $("#audio-position").html(rounded);

                    if (duration <= 0) {
                        duration = audioMedia.getDuration();
                        $("#media-duration").html(duration);
                    }
                }

            },
            function(error){
                console.log("Error getiing position");
            },
            1000);
    }
    
    // play
    function playAudio() {

        if (audioMedia == null) {
            audioMedia = new Media(srcAudio,
                    function(){
                        clearInterval(audioTimer);
                        audioTimer = null;
                        audioMedia = null;
                        paused = false;
                        duration = -1;
                    }, 

                    function(error){
                        console.log(error);
                    }
            );

            audioMedia.play();

        } else {
            if (paused) {
                paused = false;
                audioMedia.play();
            }
        }

        if (audioTimer  == null) {
            audioTimer = setInterval(updateUI, 1000)
        }
    }

    // stop
    function stopAudio() {
        if (audioMedia) {
            audioMedia.stop();
            audioMedia.release();
            audioMedia = null;
        }

        if (audioTimer) {
            clearInterval(audioTimer);
            audioTimer = null;
        }
    }

    // events
    
    $("#play").tap(function(){
        console.log("play tapped");
        playAudio();
    });

    $("#pause").tap(function(){
        console.log("pause tapped");
        if (paused) return;
        if (audioMedia) {
            paused = true;
            audioMedia.pause();
        }
    });

    $("#stop").tap(function() {
        console.log("stop tapped");
        stopAudio();
    });

 });
