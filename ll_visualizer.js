let instructions = [];
let currentInstruction = 0;
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;

let radius = 20;

let nodes = [];
let nodesHelper = []; //is used when we want to erase a node or add in the middle, we divide the list in two parts and then we join them
let newNode = {};
let data = "";
let state = "none";
let focusCircle = null;
let founded = false;
let deleting = false;
const durability = 500; //durabilidad de la animacion en milisegundos

for (let i = 0; i < 5; i++) {
    nodes.push({
        x: 100 + i * 100,
        y: 100,
        data: i
    });
}

//main clock del programa, se ejecuta cada 2 segundos para actualizar el estado del programa
setInterval(() => {
    console.log(currentInstruction);
    if (currentInstruction < instructions.length) {
    
        if (state == "push_back") {
            actualizePushBack();
        } else if (state == "push_front") {
            actualizePushFront();
        } else if (state == "pop_back") {
            actualizePopBack();
        } else if (state == "pop_front") {
            actualizePopFront();
        } else if (state == "search") {
            actualizeSearch();
        } else if (state == "delete") {
            actualizeDelete();
        }

        actualizeCurrent(currentInstruction);
        currentInstruction++;
    } else {
        clearInterval(); // stop interval
        clearInstructionSet();
    }
}, durability);



// PUSH BACK FUNCTIONS ---------------------------------------------------------
function addNodeAtEnd() {
    state = "push_back";
    data = document.getElementById("data").value;
    instructions = ["create node", "linking node"];
    instructionSet.innerHTML = "";
    for (let i = 0; i < instructions.length; i++) {
        instructionSet.innerHTML += '<p class="instruction">' + instructions[i] + '</p>';
    }
    currentInstruction = 0;
}

function actualizePushBack() {
    if (currentInstruction === 0) {
        //crear un nuevo nodo, dibujarlo al final (sin linkear)
        newNode = {
            x: 100 + nodes.length * 100,
            y: 100,
            data: data
        };
    } else if (currentInstruction === 1) {
        //pushear nuevo nodo, dejar de dibujarlo y desplazar todos los nodos a la izquierda
        nodes.push(newNode);
        newNode = null;

    }
}




// POP BACK FUNCTIONS ----------------------------------------------------------
function addNodeAtBeginning() {
    state = "push_front";
    data = document.getElementById("data").value;
    instructions = ["create node", "linking node"];
    instructionSet.innerHTML = "";
    for (let i = 0; i < instructions.length; i++) {
        instructionSet.innerHTML += '<p class="instruction">' + instructions[i] + '</p>';
    }
    currentInstruction = 0;
}

function actualizePushFront() {
    if (currentInstruction === 0) {
        //crear un nuevo nodo, dibujarlo al principio (sin linkear)
        newNode = {
            x: 100,
            y: 100,
            data: data
        };

        moveEveryNode(100, 0, nodes);
    } else if (currentInstruction === 1) {
        //pushear nuevo nodo, dejar de dibujarlo y desplazar todos los nodos a la derecha
        nodes.unshift(newNode);
        newNode = null;
    }
}



// POP BACK FUNCTIONS ----------------------------------------------------------
function removeNodeAtEnd() {
    state = "pop_back";
    instructions = ["unlinking node", "delete node"];
    instructionSet.innerHTML = "";
    for (let i = 0; i < instructions.length; i++) {
        instructionSet.innerHTML += '<p class="instruction">' + instructions[i] + '</p>';
    }
    currentInstruction = 0;
}

function actualizePopBack() {
    if (currentInstruction === 0) {
        //deslinkear nodo, dejar de dibujarlo y desplazar todos los nodos a la derecha
        newNode = nodes.pop();
    } else if (currentInstruction === 1) {
        //borrar nodo
        newNode = null;
    }
}



// POP FRONT FUNCTIONS ---------------------------------------------------------
function removeNodeAtBeginning() {
    state = "pop_front";
    instructions = ["unlinking node", "delete node"];
    instructionSet.innerHTML = "";
    for (let i = 0; i < instructions.length; i++) {
        instructionSet.innerHTML += '<p class="instruction">' + instructions[i] + '</p>';
    }
    currentInstruction = 0;
}

function actualizePopFront() {
    if (currentInstruction === 0) {
        //deslinkear nodo, dejar de dibujarlo y desplazar todos los nodos a la derecha
        newNode = nodes.shift();
    } else if (currentInstruction === 1) {
        //borrar nodo
        newNode = null;
        moveEveryNode(-100, 0, nodes);
    }
}


// SEARCH FUNCTIONS ------------------------------------------------------------
function searchNode() {
    state = "search";
    founded = false;
    data = document.getElementById("data").value;
    instructions = [];
    for (let i = 0; i < nodes.length; i++) {
        instructions.push("checking " + nodes[i].data);
    }
    
    instructions.push("not found");
    instructionSet.innerHTML = "";
    for (let i = 0; i < instructions.length; i++) {
        instructionSet.innerHTML += '<p class="instruction">' + instructions[i] + '</p>';
    }
    currentInstruction = 0;
}

function actualizeSearch() {
    if (currentInstruction >= 0 && currentInstruction < nodes.length && !founded) {
        //buscar en el nodo current
        focusCircle = nodes[currentInstruction];
        console.log(focusCircle);
        console.log(nodes[currentInstruction]);
        founded = nodes[currentInstruction].data == data;
        console.log(data);
    } else if (!founded) {
        //no se encontro el nodo
        focusCircle = null;
        founded = false;
    } else {
        //se encontro el nodo
        instructions = instructions.slice(0, currentInstruction);
        instructions.push("found");
        //eliminar html
        instructionSet.innerHTML = "";
        for (let i = 0; i < instructions.length; i++) {
            instructionSet.innerHTML += '<p class="instruction">' + instructions[i] + '</p>';
        }
        focusCircle = null;
        founded = true;
    }
}



// DELETE FUNCTIONS ------------------------------------------------------------
function deleteNode() {
    state = "delete";
    founded = false;
    data = document.getElementById("data").value;
    instructions = [];
    for (let i = 0; i < nodes.length; i++) {
        instructions.push("checking " + nodes[i].data);
    }
    
    instructions.push("not found");
    instructionSet.innerHTML = "";
    for (let i = 0; i < instructions.length; i++) {
        instructionSet.innerHTML += '<p class="instruction">' + instructions[i] + '</p>';
    }
    currentInstruction = 0;
}

function actualizeDelete() {
    if (!deleting) {   
        //buscar nodo a eliminar      
        if (currentInstruction >= 0 && currentInstruction < nodes.length && !founded) {
            //buscar en el nodo current
            focusCircle = nodes[currentInstruction];
            console.log(focusCircle);
            console.log(nodes[currentInstruction]);
            founded = nodes[currentInstruction].data == data;
            console.log(data);
        } else if (!founded) {
            //no se encontro el nodo
            focusCircle = null;
            founded = false;
        } else {
            //se encontro el nodo
            instructions = instructions.slice(0, currentInstruction);
            instructions.push("found");
            instructions.push("unlinking node");
            instructions.push("delete node");
            //eliminar html
            instructionSet.innerHTML = "";
            for (let i = 0; i < instructions.length; i++) {
                instructionSet.innerHTML += '<p class="instruction">' + instructions[i] + '</p>';
            }
            focusCircle = null;
            founded = true;
            deleting = true;
        }
    } else if (deleting) {
        //eliminar nodo
        const newBase = instructions.length - 2;
        if (currentInstruction === newBase) {
            //deslinkear nodo, dejar de dibujarlo y desplazar todos los nodos a la derecha
            nodesHelper = nodes.slice(currentInstruction - 2, nodes.length);
            nodes = nodes.slice(0, currentInstruction - 2);
            newNode = nodesHelper.shift(); //sacar el primer elemento de nodesHelper
        } else if (currentInstruction === newBase + 1) {
            //borrar nodo
            newNode = null;
            moveEveryNode(-100, 0, nodesHelper);
            nodes = nodes.concat(nodesHelper);
        }
    }
}



// EXTRA FUNCTIONS =============================================================
function moveEveryNode(x, y, nodes=nodes) {
    // for (let i = 0; i < nodes.length; i++) {
    //     nodes[i].x += x;
    //     nodes[i].y += y;
    // }

    //animacion de "durability" milisegundos
    for (let i = 0; i < durability; i++) {
        setTimeout(() => {
            for (let j = 0; j < nodes.length; j++) {
                nodes[j].x += x / durability;
                nodes[j].y += y / durability;
            }
        }, i);
    }
}

function drawNode(node, previous=null, color="black") {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.fillText(node.data, node.x - 5, node.y + 5);

    // dibujar flecha entre nodos
    if (previous !== null) {
        //Dibujar dos flechas, una de ida y otra de vuelta
        let desfase = 10 * Math.PI / 180; //desfase de la flecha para que no se superpongan

        let angle = Math.atan2(node.y - previous.y, node.x - previous.x);

        let startX = previous.x + radius * Math.cos(angle + desfase);
        let startY = previous.y + radius * Math.sin(angle + desfase);

        let endX = node.x - radius * Math.cos(angle - desfase);
        let endY = node.y - radius * Math.sin(angle - desfase);

        drawArrow(startX, startY, endX, endY);

        startX = node.x - radius * Math.cos(angle + desfase);
        startY = node.y - radius * Math.sin(angle + desfase);

        endX = previous.x + radius * Math.cos(angle - desfase);
        endY = previous.y + radius * Math.sin(angle - desfase);

        drawArrow(startX, startY, endX, endY);
    }
}


function drawArrow(startX, startY, endX, endY) {
    // dibujar linea
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();

    let angle = Math.atan2(endY - startY, endX - startX);

    // calcular puntos de la flecha
    let arrowAngle = Math.PI / 8; //angulo de aperture de la flecha

    let arrowX1 = endX - 10 * Math.cos(angle + arrowAngle);
    let arrowY1 = endY - 10 * Math.sin(angle + arrowAngle);

    let arrowX2 = endX - 10 * Math.cos(angle - arrowAngle);
    let arrowY2 = endY - 10 * Math.sin(angle - arrowAngle);

    // dibujar flecha
    ctx.beginPath();
    ctx.moveTo(endX, endY);
    ctx.lineTo(arrowX1, arrowY1);
    ctx.lineTo(arrowX2, arrowY2);
    ctx.fill();
    ctx.closePath();
}

function clearCanvas() {
    ctx.clearRect(0, 0, width, height);
}


function drawNodes() {
    for (let i = 0; i < nodes.length; i++) {
        drawNode(nodes[i], i > 0 ? nodes[i - 1] : null);
    }

    for (let i = 0; i < nodesHelper.length; i++) {
        drawNode(nodesHelper[i], i > 0 ? nodesHelper[i - 1] : null);
    }
}

function drawFocusCircle(color="red") {
    if (focusCircle !== null) {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.arc(focusCircle.x, focusCircle.y, radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.closePath();
    }
}


function draw() {
    clearCanvas();
    drawNodes();
    if (newNode !== null) {
        drawNode(newNode, null, "red");
    }
    drawFocusCircle(founded ? "yellow" : "red");
}

setInterval(draw, 1000 / 60);