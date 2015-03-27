var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {preload: preload, create: create, update: update});

var PLAYER_VELOCITY = 150;

var player,
    enemies,
    enemy1,
    enemy2,
    slash,
    cursors;


function preload() {
    game.load.image('player', 'assets/tom.png');
    game.load.image('enemy', 'assets/enemy.png');
    game.load.spritesheet('slash', 'assets/slash.png', 16, 16);
}

function create() {
    //Adding physics
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    //Adding our hero
    player = game.add.sprite(400, 300, 'player');
    player.anchor.setTo(0.5, 0.5);
    
	//Adding our enemies
    enemies = game.add.group();
    enemy1 = enemies.create(5, 236, 'enemy');
    enemy2 = enemies.create(785, 236, 'enemy');
    
    //Adding slash
    slash = game.add.sprite(0, 0, 'slash');
    slash.anchor.setTo(0.5, 0.5);
    slash.scale.setTo(1, 2);
    
    slash.animations.add('slash', [0, 1, 2, 3, 4]);
    slash.kill();
	
    //Physics and hero must interact
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    
    game.physics.arcade.enable(enemies);
    game.physics.arcade.enable(slash);
    enemy1.body.immovable = true;
    enemy2.body.immovable = true;
    
    //Initializing input
    cursors = game.input.keyboard.createCursorKeys();
}

function update() {
    //Checking for collisions
    game.physics.arcade.collide(player, enemies);
    game.physics.arcade.collide(slash, enemies);
    
    //Checking input
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;
    
    if(!slash.alive) {
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
    
    if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
        if(!slash.alive) {
            slash.revive();
            slash.x = player.x + 32;
            slash.y = player.y;
            slash.animations.play('slash', 10, false, true);
        }
    }
}
