var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {preload: preload, create: create, update: update});

var PLAYER_VELOCITY = 150;

var player,
    cursors;


function preload() {
    game.load.image('player', 'assets/tom.png');
}

function create() {
    //Adding physics
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    //Adding our hero
    player = game.add.sprite(0, 0, 'player');
    
    //Physics and hero must interact
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    
    //Initializing input
    cursors = game.input.keyboard.createCursorKeys();
}

function update() {
    //Checking input
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;
    
    if(cursors.left.isDown) {
        player.body.velocity.x -= PLAYER_VELOCITY;
    }
    if(cursors.right.isDown) {
        player.body.velocity.x += PLAYER_VELOCITY;
    }
    if(cursors.up.isDown) {
        player.body.velocity.y -= PLAYER_VELOCITY;
    }
    if(cursors.down.isDown) {
        player.body.velocity.y += PLAYER_VELOCITY;
    }
    
}