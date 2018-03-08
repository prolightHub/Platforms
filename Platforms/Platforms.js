var canvas = document.getElementById("canvas");
var processing = new Processing(canvas, function(processing) {
    processing.size(400, 400);
    processing.background(0xFFF);

    var mouseIsPressed = false;
    processing.mousePressed = function () { mouseIsPressed = true; };
    processing.mouseReleased = function () { mouseIsPressed = false; };

    var keyIsPressed = false;
    processing.keyPressed = function () { keyIsPressed = true; };
    processing.keyReleased = function () { keyIsPressed = false; };

    function getImage(s) {
        var url = "https://www.kasandbox.org/programming-images/" + s + ".png";
        processing.externals.sketch.imageCache.add(url);
        return processing.loadImage(url);
    }

    function getLocalImage(url) {
        processing.externals.sketch.imageCache.add(url);
        return processing.loadImage(url);
    }

    // use degrees rather than radians in rotate function
    var rotateFn = processing.rotate;
    processing.rotate = function (angle) {
        rotateFn(processing.radians(angle));
    };

    with (processing) {
      var rounded = false;
var playerColor = color(105, 20, 25);

noStroke();
var keys = [];
var keyPressed = function()
{
    keys[keyCode] = true;
};
var keyReleased = function()
{
    keys[keyCode] = false;
};
var cloud = function(X, Y)
{
    this.X = X;
    this.Y = Y;
};
cloud.prototype.Draw = function()
{
    var xPos = this.X;
    var yPos = this.Y;
    pushMatrix();
    translate(xPos, yPos);
    scale(0.5, 0.5);
    fill(255, 255, 255);
    ellipse(0, 150, 100, 80);
    ellipse(-40, 150, 70, 60);
    ellipse(40, 150, 70, 60);
    popMatrix();
};

var CloudRange = function(CloudsAmt, XStart, XEnd, YStart, YEnd)
{
    this.CloudsAmt = CloudsAmt;
    this.XStart = XStart;
    this.XEnd = XEnd;
    this.YStart = YStart - 100;
    this.YEnd = YEnd;
    this.Clouds = [];
};
CloudRange.prototype.Create = function()
{
    this.Clouds.length = 0;
    for (var i = 0; i < this.CloudsAmt; i++)
    {
        this.Clouds.push(new cloud(random(this.XStart, this.XEnd),
            random(this.YStart, this.YEnd)));
    }
};
CloudRange.prototype.Draw = function()
{
    for (var i = 0; i < this.Clouds.length; i++)
    {
        this.Clouds[i].Draw();
    }
};
var CloudsRange1 = new CloudRange(random(5, 10), 0, 400, 0, 125);
var drawBackground = function()
{
    background(85, 220, 250);
    fill(255, 200, 0);
    ellipse(110, 65, 40, 40);
    CloudsRange1.Draw();
};
var Player = function(x, y, w, h, jumpheight, Color)
{
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.xvel = 0;
    this.yvel = 0;

    this.falling = true;
    this.gravity = 0.4;
    this.jumpHeight = jumpheight;
    this.maxFallSpeed = 12;

    this.moveSpeed = 0.5;
    this.maxMoveSpeed = 5;
    this.Color = Color;
    fill(255, 0, 0);
    this.update = function(platforms)
    {
        if (keys[LEFT])
        {
            this.xvel -= this.moveSpeed;
        }
        if (keys[RIGHT])
        {
            this.xvel += this.moveSpeed;
        }
        if (!keys[LEFT] && !keys[RIGHT])
        {
            if (this.xvel > 0)
            {
                this.xvel -= this.moveSpeed;
            }
            if (this.xvel < 0)
            {
                this.xvel += this.moveSpeed;
            }
            if (this.xvel < 0.1 && this.xvel > 0)
            {
                this.xvel = 0;
            }
            if (this.xvel > -0.1 && this.xvel < 0)
            {
                this.xvel = 0;
            }
        }
        if (keys[UP] && !this.falling)
        {
            this.yvel = -this.jumpHeight;
        }
        this.yvel += this.gravity;
        if (this.yvel > this.maxFallSpeed)
        {
            this.yvel = this.maxFallSpeed;
        }
        if (this.xvel > this.maxMoveSpeed)
        {
            this.xvel = this.maxMoveSpeed;
        }
        if (this.xvel < -this.maxMoveSpeed)
        {
            this.xvel = -this.maxMoveSpeed;
        }
        this.x += this.xvel;
        this.collideWith(this.xvel, 0, platforms);
        this.falling = true;
        this.y += this.yvel;
        this.collideWith(0, this.yvel, platforms);
    };
    this.collideWith = function(xv, yv, platforms)
    {
        for (var i = 0; i < platforms.length; i++)
        {
            var p = platforms[i];
            if (this.y + this.h > p.y &&
                this.y < p.y + p.h &&
                this.x + this.w > p.x &&
                this.x < p.x + p.w)
            {
                // BOTTOM
                if (yv > 0)
                {
                    this.yvel = 0;
                    this.falling = false;
                    this.y = p.y - this.h;
                }
                // TOP
                if (yv < 0)
                {
                    this.yvel = 0;
                    this.falling = true;
                    this.y = p.y + p.h;
                }
                // RIGHT
                if (xv > 0)
                {
                    this.xvel = 0;
                    this.x = p.x - this.w;
                }
                // LEFT
                if (xv < 0)
                {
                    this.xvel = 0;
                    this.x = p.x + p.w;
                }
            }
        }
    };
    this.draw = function()
    {
        fill(this.Color);
        if (rounded === true)
        {
            rect(this.x, this.y, this.w, this.h, 10);
        }
        if (rounded === false)
        {
            rect(this.x, this.y, this.w, this.h);
        }
    };
};
var player = new Player(200, 200, 25, 25, 10, playerColor);

var Block = function(t, x, y, w, h, color)
{
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
};
Block.prototype.draw = function()
{
    fill(this.color);
    if (rounded === true)
    {
        rect(this.x, this.y, this.w, this.h, 15);
    }
    if (rounded === false)
    {
        rect(this.x, this.y, this.w, this.h);
    }
};

var Goal = function(x, y)
{
    this.x = x;
    this.y = y;
    this.h = 50;
    this.w = 40;
    this.Color = color(54, 92, 0, 175);
};
Goal.prototype.Draw = function()
{
    if (rounded === false)
    {
        fill(this.Color);
        rect(this.x, this.y, this.w, this.h);
        fill(this.Color - 80);
        rect(this.x + 5, this.y + 5, this.w - 10, this.h - 10);
    }
    if (rounded === true)
    {
        fill(this.Color);
        rect(this.x, this.y, this.w, this.h, 50);
        fill(this.Color - 80);
        rect(this.x + 5, this.y + 5, this.w - 10, this.h - 10, 50);
    }
};
Goal.prototype.Colliding = function()
{
    return player.y + player.h > this.y &&
        player.y < this.y + this.h &&
        player.x + player.w > this.x &&
        player.x < this.x + this.w;
};

var Lava = function(x, y, h, w)
{
    this.x = x;
    this.y = y;
    this.h = h;
    this.w = w;
    this.Color = color(212, 109, 7, 200);
};
Lava.prototype.Draw = function()
{
    if (rounded === false)
    {
        fill(this.Color);
        rect(this.x, this.y, this.w, this.h);
        fill(this.Color + 100);
        rect(this.x + 5, this.y + 5, this.w - 10, this.h - 10);
    }
    if (rounded === true)
    {
        fill(this.Color);
        rect(this.x, this.y, this.w, this.h, 50);
        fill(this.Color + 100);
        rect(this.x + 5, this.y + 5, this.w - 10, this.h - 10, 5);
    }
};
Lava.prototype.Colliding = function()
{
    return player.y + player.h > this.y &&
        player.y < this.y + this.h &&
        player.x + player.w > this.x &&
        player.x < this.x + this.w;
};

var level = 0;
var makingLevels = false;
var Goals = [
    new Goal(300, 340), new Goal(530, 340), new Goal(230, 340), new Goal(100, 160), new Goal(100, 160),
    new Goal(100, 160), new Goal(100, 160), new Goal(100, 160)
];
var resetGoalsXPos = Goals[level].x;

var startPos = [
    [120, 360],
    [120, 260],
    [120, 260],
    [120, 260],
    [120, 260],
    [120, 260],
    [120, 260],
    [120, 260]
];
var resetstartPosXPos = startPos[level][0];

var platformColor = color(0, 125, 45);
var platforms = [
    [
        new Block(0, 30, 390, 340, 10, platformColor),
        new Block(0, 38, 330, 10, 50, platformColor)
    ],
    [
        new Block(0, 30, 390, 640, 10, platformColor),
        new Block(0, 450, 300, 30, 70, platformColor)
    ],
    [
        new Block(0, 30, 390, 340, 10, platformColor),
        new Block(0, 38, 330, 10, 50, platformColor)
    ],
    [
        new Block(0, 30, 390, 340, 10, platformColor),
        new Block(0, 38, 330, 10, 50, platformColor)
    ],
    [
        new Block(0, 30, 390, 340, 10, platformColor),
        new Block(0, 0, 330, 10, 50, platformColor),
        new Block(0, 70, 130, 10, 90, platformColor),
        new Block(0, 28, 214, 50, 10, platformColor)
    ],
    [
        new Block(0, 30, 390, 340, 10, platformColor),
        new Block(0, 0, 330, 10, 100, platformColor),
        new Block(0, 70, 130, 10, 90, platformColor),
        new Block(0, 28, 214, 150, 10, platformColor),
        new Block(0, 28, 143, 50, 10, platformColor)
    ],
    [
        new Block(0, 30, 390, 340, 10, platformColor),
        new Block(0, 0, 330, 10, 50, platformColor),
        new Block(0, 70, 130, 10, 90, platformColor),
        new Block(0, 28, 214, 50, 10, platformColor)
    ],
    [
        new Block(0, 30, 390, 340, 10, platformColor),
        new Block(0, 0, 330, 10, 50, platformColor),
        new Block(0, 70, 130, 10, 90, platformColor),
        new Block(0, 28, 214, 50, 10, platformColor)
    ],
];
//Must create a duplicate copy for reset.
var resetPlatformsXPos = [
    [
        new Block(0, 30, 390, 340, 10, platformColor),
        new Block(0, 38, 330, 10, 50, platformColor)
    ],
    [
        new Block(0, 30, 390, 640, 10, platformColor),
        new Block(0, 450, 300, 30, 70, platformColor)
    ],
    [
        new Block(0, 30, 390, 340, 10, platformColor),
        new Block(0, 38, 330, 10, 50, platformColor)
    ],
    [
        new Block(0, 30, 390, 340, 10, platformColor),
        new Block(0, 38, 330, 10, 50, platformColor)
    ],
    [
        new Block(0, 30, 390, 340, 10, platformColor),
        new Block(0, 0, 330, 10, 50, platformColor),
        new Block(0, 70, 130, 10, 90, platformColor),
        new Block(0, 28, 214, 50, 10, platformColor)
    ],
    [
        new Block(0, 30, 390, 340, 10, platformColor),
        new Block(0, 0, 330, 10, 100, platformColor),
        new Block(0, 70, 130, 10, 90, platformColor),
        new Block(0, 28, 214, 150, 10, platformColor),
        new Block(0, 28, 143, 50, 10, platformColor)
    ],
    [
        new Block(0, 30, 390, 340, 10, platformColor),
        new Block(0, 0, 330, 10, 50, platformColor),
        new Block(0, 70, 130, 10, 90, platformColor),
        new Block(0, 28, 214, 50, 10, platformColor)
    ],
    [
        new Block(0, 30, 390, 340, 10, platformColor),
        new Block(0, 0, 330, 10, 50, platformColor),
        new Block(0, 70, 130, 10, 90, platformColor),
        new Block(0, 28, 214, 50, 10, platformColor)
    ],
];

var Lava1 = [
    [
        new Lava(240, 330, 50, 40),
        new Lava(140, 238, 30, 20)
    ],
    [
        new Lava(241, 160, 90, 30),
        new Lava(241, 360, 50, 30)
    ],
    [
        new Lava(150, 230, 160, 30)
    ],
    [
        new Lava(150, 20, 160, 30)
    ],
    [
        new Lava(150, 20, 160, 30),
        new Lava(-25, 160, 20, 60)
    ],
    [
        new Lava(150, 20, 160, 30),
        new Lava(-25, 50, 20, 60)
    ],
    [
        new Lava(150, 20, 160, 30),
        new Lava(-25, 160, 20, 60)
    ],
    [
        new Lava(150, 20, 160, 30),
        new Lava(-25, 160, 20, 60)
    ]
];
//Must create a duplicate copy for reset.
var resetLava1XPos = [
    [
        new Lava(240, 330, 50, 40),
        new Lava(140, 238, 30, 20)
    ],
    [
        new Lava(241, 160, 90, 30),
        new Lava(241, 360, 50, 30)
    ],
    [
        new Lava(150, 230, 160, 30)
    ],
    [
        new Lava(150, 20, 160, 30)
    ],
    [
        new Lava(150, 20, 160, 30),
        new Lava(-25, 160, 20, 60)
    ],
    [
        new Lava(150, 20, 160, 30),
        new Lava(-25, 50, 20, 60)
    ],
    [
        new Lava(150, 20, 160, 30),
        new Lava(-25, 160, 20, 60)
    ],
    [
        new Lava(150, 20, 160, 30),
        new Lava(-25, 160, 20, 60)
    ]
];

Lava1.draw = function()
{
    for (var i = 0; i < Lava1[level].length; i++)
    {
        Lava1[level][i].Draw();
    }
};
Lava1.colliding = function()
{
    var Colliding = false;
    for (var i = 0; i < Lava1[level].length; i++)
    {
        if (Lava1[level][i].Colliding())
        {
            Colliding = true;
            return Colliding;
        }
    }

};

startPos.draw = function()
{
    fill(0, 0, 0);
    ellipse(startPos[level][0], startPos[level][1], 20, 20);
};
platforms.draw = function()
{
    for (var i = 0; i < platforms[level].length; i++)
    {
        platforms[level][i].draw();
    }
};
var Bar = function(yPos, height)
{
    this.yPos = yPos;
    this.height = height;
};
Bar.prototype.draw = function()
{
    fill(0, 0, 0, 50);
    rect(0, this.yPos, width, this.height);
    textSize(15);
    fill(0, 0, 0, 50);
    text("Level : " + (1 + level), 20, this.yPos + this.height / 1.5);
};
var topBar = new Bar(0, 20);
var Scroll = function(StopLeft, StopRight)
{
    if (player.x < StopLeft)
    {
        for (var i = 0; i < platforms[level].length; i++)
        {
            platforms[level][i].x -= player.xvel + 1;
        }
        for (var i = 0; i < Lava1[level].length; i++)
        {
            Lava1[level][i].x -= player.xvel + 1;
        }
        Goals[level].x -= player.xvel + 1;
        startPos[level][0] -= player.xvel + 1;
        player.x = StopLeft;
    }
    if (player.x > StopRight)
    {
        for (var i = 0; i < platforms[level].length; i++)
        {
            platforms[level][i].x -= player.xvel - 1;
        }
        for (var i = 0; i < Lava1[level].length; i++)
        {
            Lava1[level][i].x -= player.xvel - 1;
        }
        Goals[level].x -= player.xvel - 1;
        startPos[level][0] -= player.xvel - 1;
        player.x = StopRight;
    }
};
var resetGameObjectsxPos = function()
{
    Goals[level].x = resetGoalsXPos;
    startPos[level][0] = resetstartPosXPos;
    for (var i = 0; i < platforms[level].length; i++)
    {
        platforms[level][i].x = resetPlatformsXPos[level][i].x;
    }
    for (var i = 0; i < Lava1[level].length; i++)
    {
        Lava1[level][i].x = resetLava1XPos[level][i].x;
    }
    player.x = startPos[level][0];
    player.y = startPos[level][1];
};
var funObject = function(xPos, yPos, speed)
{
    this.xPos = xPos;
    this.yPos = yPos;
    this.speed = speed;
};
funObject.prototype.draw = function()
{
    fill(0, 101, 228, this.speed * 40);
    rect(this.xPos, this.yPos, 2 * this.speed, 4 * this.speed, 10);
};
funObject.prototype.Move = function()
{
    this.yPos += this.speed;
    if (this.yPos > 420)
    {
        this.yPos = -20;
    }
};
{
    var Objects1 = [];
    var rain = function()
    {
        for (var i = 0; i < random(15, 30); i++)
        {
            Objects1.push(new funObject(random(0, 400), random(0, 400), random(1, 5)));
        }
    };
    rain.prototype.draw = function()
    {
        for (var i = 0; i < Objects1.length; i++)
        {
            Objects1[i].Draw();

            Objects1[i].Move();
        }
    };

}
var Rain = new rain();
var setUpNextLevel = function()
{
    level += 1;
    resetGoalsXPos = Goals[level].x;
    resetstartPosXPos = startPos[level][0];
    for (var i = 0; i < platforms[level].length; i++)
    {
        resetPlatformsXPos[level][i].x = platforms[level][i].x;
    }
    for (var i = 0; i < Lava1[level].length; i++)
    {
        resetLava1XPos[level][i].x = Lava1[level][i].x;
    }
    resetGameObjectsxPos();
    CloudsRange1.Create();
    player.x = startPos[level][0];
    player.y = startPos[level][1];
};
var setTM = 0;
var setTop = 100;
var setlength = 6;
var loadIcon = function(speed, Size)
{
    pushMatrix();
    translate(200, 200);
    rotate(speed * 2);
    noFill();
    stroke(7, 111, 171);
    strokeWeight(4);
    arc(0, 0, Size, -Size, 90, 360);
    var ImgSize = Size;
    textFont("fantasy", ImgSize - 10);
    fill(0, 101, 148);
    text("E", -ImgSize / 3.5, -ImgSize / 3.5, ImgSize, ImgSize);
    popMatrix();
    noStroke();
};
var loadbackground = function()
{
    fill(0, 101, 148);
    stroke(0, 0, 0);
    textSize(45);
    text("Platforms", 110, 90);
    textSize(30);
    text("Loading...", 140, 140);
    textSize(20);
    text(round((setTM / setlength)) + "%", 185, 265);
    text("By prolight", 155, 305);
    textSize(15);
    noStroke();
};
//The setup function is pretty much reliable
setup = function()
{
    //CheckFor errors and Fix them:
    {
        //Fix the Lava
        if (setTM > 60 && setTM < 80 && platforms.length > Lava1.length)
        {
            println("!Error! :" + "\nShortage of arrays In Lava1 array");
            println("Generating extra arrays");
            var mpe = platforms.length;
            for (var i = 0; i < mpe - Lava1.length; i++)
            {
                Lava1.push([new Lava(0, 0, 10, 10)]);
            }
            if (platforms.length === Lava1.length)
            {
                println("Done");
            }
            if (platforms.length > Lava1.length)
            {
                mpe++;
            }
        }
        if (setTM > 100 && setTM < 120 && resetPlatformsXPos.length > resetLava1XPos.length)
        {
            println("!Error! :" + "\nShortage of arrays In resetLava1XPos array");
            println("Generating extra arrays");
            var mpe = resetPlatformsXPos.length;
            for (var i = 0; i < mpe - resetLava1XPos.length; i++)
            {
                resetLava1XPos.push([new Lava(0, 0, 10, 10)]);
            }
            if (resetPlatformsXPos.length === resetLava1XPos.length)
            {
                println("Done");
            }
            if (resetPlatformsXPos.length > resetLava1XPos.length)
            {
                mpe++;
            }
        }
        if (setTM > 180 && setTM < 200 && Lava1.length > resetLava1XPos.length)
        {
            println("!Error! :" + "\nShortage of arrays In resetLava1XPos array");
            println("Generating extra arrays");
            var mpe = Lava1.length;
            for (var i = 0; i < mpe - resetLava1XPos.length; i++)
            {
                resetLava1XPos.push([new Lava(0, 0, 10, 10)]);
            }
            if (Lava1.length === resetLava1XPos.length)
            {
                println("Done");
            }
            if (Lava1.length > resetLava1XPos.length)
            {
                mpe++;
            }
        }
        if (setTM > 200 && Lava1.length < resetLava1XPos.length)
        {
            println("!Error! :" + "\nShortage of arrays In Lava1 array");
            println("Generating extra arrays");
            var mpe = Lava1.length;
            for (var i = 0; i < mpe - resetLava1XPos.length; i++)
            {
                resetLava1XPos.push([new Lava(0, 0, 10, 10)]);
            }
            if (Lava1.length === resetLava1XPos.length)
            {
                println("Done");
            }
            if (Lava1.length > resetLava1XPos.length)
            {
                mpe++;
            }
        }


        //Ground Cannot Be Fixed
        if (setTM > 80 && setTM < 100 && platforms.length < Lava1.length)
        {
            println("!Error! :" + "\nShortage of arrays In platforms array");
            throw platforms.length;
        }
        if (setTM > 120 && setTM < 140 && resetPlatformsXPos.length < resetLava1XPos.length)
        {
            println("!Error! :" + "\nShortage of arrays In resetPlatformsXPos array");
            throw resetPlatformsXPos.length;
        }
        if (setTM > 140 && setTM < 160 && platforms.length > resetPlatformsXPos.length)
        {
            println("!Error! :" + "\nShortage of arrays In resetPlatformsXPos array");
            throw resetPlatformsXPos.length;
        }
        if (setTM > 160 && setTM < 180 && platforms.length < resetPlatformsXPos.length)
        {
            println("!Error! :" + "\nShortage of arrays In platforms array");
            throw platforms.length;
        }
    }
    //Test The reset Function
    if (setTM > 220 && setTM < 250)
    {
        resetGameObjectsxPos();
    }
    //Make the Clouds
    if (setTM > 250 && setTM < 252)
    {
        CloudsRange1.Create();
    }
    //set The xPositions of our Program
    if (setTM > 260 && setTM < 280)
    {
        level = 0;
        resetGoalsXPos = Goals[level].x;
        resetstartPosXPos = startPos[level][0];
        for (var i = 0; i < platforms[level].length; i++)
        {
            resetPlatformsXPos[level][i].x = platforms[level][i].x;
        }
        for (var i = 0; i < Lava1[level].length; i++)
        {
            resetLava1XPos[level][i].x = Lava1[level][i].x;
        }
        player.x = startPos[level][0];
        player.y = startPos[level][1];
    }
};
var maxLevelAmt = -1 + platforms.length;
draw = function()
{

    if (setTM < setTop * setlength && makingLevels === false)
    {
        setTM++;
        background(0, 0, 0);
        //Rain.draw();
        loadbackground();
        loadIcon(setTM * setTM / 60, 60);
        setup();
    }
    else
    {
        drawBackground();
        platforms.draw();
        startPos.draw();
        Lava1.draw();
        Goals[level].Draw();
        player.draw();
        topBar.draw();
        player.update(platforms[level]);
        Scroll(125, 255);
        if (player.y > 400 || Lava1.colliding())
        {
            resetGameObjectsxPos();
        }
        if (Goals[level].Colliding() && level < maxLevelAmt)
        {
            setUpNextLevel();
        }
    }
};

    }
    if (typeof draw !== 'undefined') processing.draw = draw;
});