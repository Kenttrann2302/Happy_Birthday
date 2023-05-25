window.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById("particles");
    var ctx = canvas.getContext("2d");
    var particles = [];
    var particleText = "Happy Birthday Anna!";
    var particleTextIndex = 0;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function Particle(x, y, radius, color, dx, dy) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.dx = dx;
        this.dy = dy;

        this.draw = function() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        this.update = function() {
            if (
                this.x + this.radius > canvas.width ||
                this.x - this.radius < 0
            ) {
                this.dx = -this.dx;
            }

            if (
                this.y + this.radius > canvas.height ||
                this.y - this.radius < 0
            ) {
                this.dy = -this.dy;
            }

            this.x += this.dx;
            this.y += this.dy;

            this.draw();
        };
    }

    function init() {
        ctx.font = "30px Arial";
        ctx.textAlign = "center";
        ctx.fillText(particleText[particleTextIndex], canvas.width/2, canvas.height/2);

        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for(var y = 0, y2 = imageData.height; y < y2; y+=2) {
            for (var x = 0, x2 = imageData.width; x < x2; x += 2) {
                if (imageData.data[(x * 4 + y * 4 * imageData.width) + 3] > 128) {
                    var radius = Math.random() * 2 + 1;
                    var color = "#FFC0CB";
                    var dx = (Math.random() - 0.5) * 2;
                    var dy = (Math.random() - 0.5) * 2;

                    particles.push(new Particle(x, y, radius, color, dx, dy));
                }
            }
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for(var i = 0; i < particles.length; i++) {
            particles[i].update();
        }
    }

    function changeText() {
        particleTextIndex++;
        if(particleTextIndex >= particleText.length) {
            particleTextIndex = 0;
        }

        particles = [];
        init();
    }

    init();
    animate();

    setInterval(changeText, 2000); //change the text every 2 seconds
})