var field = new DisplayField(640, 480);
field.show();

var timer = new Timer('timerField');
var game = new Game(timer);

document.getElementById('start').addEventListener("click", function(){
    this.style.display = "none";
    document.getElementById('restart').style.display = "block";
    field.mixTags();
    field.drowTags();

    game.start();
    
    console.log('test');
});

document.getElementById('restart').addEventListener("click", function(){
    window.location.reload();
});

document.getElementById('gameField').addEventListener("click", function(){
    game.counter();

});
