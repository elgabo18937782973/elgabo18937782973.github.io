const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let ship = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 50,
    width: 50,
    height: 30,
    speed: 5,
    movingLeft: false,
    movingRight: false
};

function resetGame() {
    ship.x = canvas.width / 2 - 25;
    bullets = [];
    adjectives = ["happy", "blue", "fast", "bright", "beautiful", "tall", "old", "young", "clean"];
    comparativesSuperlatives = [
        { comparative: "happier", superlative: "happiest" },
        { comparative: "bluer", superlative: "bluest" },
        { comparative: "faster", superlative: "fastest" },
        { comparative: "brighter", superlative: "brightest" },
        { comparative: "more beautiful", superlative: "most beautiful" },
        { comparative: "taller", superlative: "tallest" },
        { comparative: "older", superlative: "oldest" },
        { comparative: "younger", superlative: "youngest" },
        { comparative: "cleaner", superlative: "cleanest" }
    ];
    fallingWords = [];
    destroyedWords = [];
    gameOver = false;
    secondRound = false;
    document.getElementById("gameCanvas").style.display = "block";
    document.getElementById("gameOver").style.display = "none";
    document.getElementById("wordTable").innerHTML = `
        <tr>
            <th>Word 1</th>
            <th>Word 2</th>
            <th>Word 3</th>
        </tr>
    `;
    gameLoop(); // Restart the game loop
}

setInterval(createWord, 2000); // Agrega una palabra cada 2 segundos

// Manejo del movimiento de la nave y disparo
window.addEventListener('keydown', (e) => {
    if (e.code === "ArrowLeft") ship.movingLeft = true;
    if (e.code === "ArrowRight") ship.movingRight = true;
    if (e.code === "Space") {
        bullets.push({ x: ship.x + ship.width / 2 - 2.5, y: ship.y, width: 5, height: 10 });
        e.preventDefault(); // Prevenir el desplazamiento de la página hacia arriba
    }
});

window.addEventListener('keyup', (e) => {
    if (e.code === "ArrowLeft") ship.movingLeft = false;
    if (e.code === "ArrowRight") ship.movingRight = false;
});

// Actualizar los objetos del juego
function update() {
    if (gameOver) return;

    // Mover la nave
    if (ship.movingLeft && ship.x > 0) {
        ship.x -= ship.speed;
    }
    if (ship.movingRight && ship.x < canvas.width - ship.width) {
        ship.x += ship.speed;
    }

    // Mover las balas
    bullets.forEach((bullet, index) => {
        bullet.y -= 5;
        if (bullet.y < 0) {
            bullets.splice(index, 1);
        }
    });

    // Mover las palabras que caen
    fallingWords.forEach((fw, index) => {
        fw.y += fw.speed;
        if (fw.y > canvas.height) {
            fallingWords.splice(index, 1);
        }
    });

    // Verificar colisiones entre balas y palabras
    bullets.forEach((bullet, bulletIndex) => {
        fallingWords.forEach((fw, wordIndex) => {
            if (
                bullet.x < fw.x + 50 &&
                bullet.x + bullet.width > fw.x &&
                bullet.y < fw.y + 20 &&
                bullet.height + bullet.y > fw.y
            ) {
                // La bala impacta una palabra
                destroyedWords.push(fw.word); // Agrega la palabra destruida a la lista
                updateWordTable(fw.word); // Actualiza la tabla con la palabra destruida
                fallingWords.splice(wordIndex, 1);
                bullets.splice(bulletIndex, 1);
            }
        });
    });
}

// Función para actualizar la tabla de palabras destruidas
function updateWordTable(word) {
    const table = document.getElementById("wordTable");

    // Obtén la última fila y añade las palabras a ella
    let lastRow = table.rows[table.rows.length - 1];
    let emptyCell = null;

    // Encuentra una celda vacía en la última fila
    for (let i = 0; i < lastRow.cells.length; i++) {
        if (lastRow.cells[i].textContent === "") {
            emptyCell = lastRow.cells[i];
            break;
        }
    }

    // Si no se encuentra una celda vacía, crea una nueva fila
    if (!emptyCell) {
        lastRow = table.insertRow(-1); // Añadir nueva fila al final
        for (let i = 0; i < 3; i++) {
            let cell = lastRow.insertCell(i);
            cell.textContent = "";
        }
        emptyCell = lastRow.cells[0]; // Añadir la palabra en la primera celda de la nueva fila
    }

    // Agrega la palabra a la celda vacía con color aleatorio
    emptyCell.textContent = word;
    emptyCell.style.color = getRandomColor();
}

// Función para generar un color aleatorio
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Función para finalizar el juego cuando se destruyan todos los adjetivos
function endGame() {
    gameOver = true;
    document.getElementById("gameOverMessage").style.display = "block";
}

// Dibujar los objetos del juego
function draw() {
    if (gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar la nave
    ctx.fillStyle = "white";
    ctx.fillRect(ship.x, ship.y, ship.width, ship.height);

    // Dibujar las balas
    bullets.forEach(bullet => {
        ctx.fillStyle = "red";
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    });

    // Dibujar las palabras
    fallingWords.forEach(fw => {
        ctx.fillStyle = getRandomColor();
        ctx.font = "20px Arial";
        ctx.fillText(fw.word, fw.x, fw.y);
    });
}

// Bucle principal del juego
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
