const puzzle = document.getElementById('puzzle');
let emptyTile = 15;

function createTile(number) {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    tile.textContent = number === 15 ? "" : number + 1;
    tile.addEventListener('click', () => {
        moveTile(number);
    });
    return tile;
}

function moveTile(number) {
    const index = tiles.indexOf(number);
    const row = Math.floor(index / 4);
    const col = index % 4;
    const emptyRow = Math.floor(emptyTile / 4);
    const emptyCol = emptyTile % 4;
    if ((Math.abs(row - emptyRow) === 1 && col === emptyCol) || (Math.abs(col - emptyCol) === 1 && row === emptyRow)) {
        tiles[emptyTile] = number;
        tiles[index] = 15;
        emptyTile = index;
        render();
        if (isSolved()) {
            alert('Təbriklər! Oyunu qazandınız :)');
        }
    }
}

function isSolved() {
    for (let i = 0; i < 15; i++) {
        if (tiles[i] !== i) {
            return false;
        }
    }
    return true;
}

function render() {
    puzzle.innerHTML = '';
    tiles.forEach(number => {
        puzzle.appendChild(createTile(number));
    });
}

function shuffleTiles() {
    for (let i = tiles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
    emptyTile = tiles.indexOf(15);
    render();
}

function solvePuzzle() {
    tiles = [...Array(15).keys()];
    tiles.push(15); // Empty tile
    emptyTile = 15;
    render();
}

let tiles = [...Array(15).keys()];
tiles.push(15); // Empty tile
shuffleTiles(); // Shuffle when the page loads