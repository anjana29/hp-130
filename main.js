scoreleftwrist=0;
song_Peter_pan="";
song1="";
song2peterpan="";
leftwristx="";
leftwristy="";
rightwristy="";
rightwristx="";
scorerightwrist=0;
song_harry_potter_theme="";
function preload(){
    song1=loadSound("music.mp3");
    song2peterpan=loadSound("music2.mp3");
}
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modeLoaded);
    poseNet.on('pose',gotPoses);
}
function draw(){
    image(video,0,0,600,500);

    fill("#2d9c8d");
    stroke("#2d9c8d");

    song_Peter_pan=song2peterpan.isPlaying();
    console.log("Peter Pan song = "+song_Peter_pan);

    song_harry_potter_theme=song1.isPlaying();
    console.log("Harry Potter Theme song = "+song_harry_potter_theme);


    if(scoreleftwrist>0.2){
        circle(leftwristx,leftwristy,20);
        song1.stop();
        if(song_Peter_pan==false){
            song2peterpan.play();
        }

        else{
            document.getElementById("songs_id").innerHTML="Song Name: Peter Pan song";
        }
    }
    if(scorerightwrist>0.2){
        circle(rightwristx,rightwristy,20);
        song2peterpan.stop();
        if(song_harry_potter_theme==false){
            song1.play();
        }

        else{
            document.getElementById("songs_id").innerHTML="Song Name: Harry Potter Theme song";
        }
    }
}
function modeLoaded(){
    console.log("PoseNet Is intialized");
}
function gotPoses(results){
if(results.length>0){
    console.log(results);

    scoreleftwrist=results[0].pose.keypoints[9].score;
    console.log("leftWrist_Score = "+scoreleftwrist);

    scorerightwrist=results[0].pose.keypoints[10].score;
    console.log("rightWrist_Score = "+scorerightwrist);

    leftwristx=results[0].pose.leftWrist.x;
    leftwristy=results[0].pose.leftWrist.y;
    console.log("leftwristx = "+leftwristx+",leftwristy = "+leftwristy);
    
    rightwristx=results[0].pose.rightWrist.x;
    rightwristy=results[0].pose.rightWrist.y;
    console.log("rightwristx = "+rightwristx+",rightwristy = "+rightwristy);

}
}

