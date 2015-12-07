function createBoxes() {
    for (var i = 0; i < 4; i++) {
        boxes.push({
            x: i * 20 + 360,
            y: 120
        });
    }
    
    boxes.push({
        x: 47 * 20,
        y: 120
    });
    
    for (var i = 0; i < 11; i ++) {
        boxes.push({
            x: i * 20 + 400,
            y: 140
        });
    }
    
    for (var i = 0; i < 3; i++) {
        boxes.push({
            x: i * 20 + 820,
            y: 140
        });
    }
    
    boxes.push({
        x: 47 * 20,
        y: 140
    });
    
    boxes.push({
        x: 820,
        y: 160
    });
    
    boxes.push({
        x: 47 * 20,
        y: 160
    });
    
    for (var i = 0; i < 10; i++) {
        boxes.push({
            x: i * 20 + 600,
            y: 180
        });
    }
    
    for (var i = 0; i < 3; i++) {
        boxes.push({
            x: (i * 20) + (47 * 20),
            y: 180
        });
    }
    
    for (var i = 0; i < 4; i++) {
        boxes.push({
            x: (i * 20) + (54 * 20),
            y: 180
        });
    }
    
    for (var i = 0; i < 10; i++){
        boxes.push({
            x: i * 20 + 100,
            y: 200
        });
    }
    
    boxes.push({
        x: 28 * 20,
        y: 200
    });
    
    for (var i = 0; i < 5; i++) {
        boxes.push({
            x: (i * 20) + (36 * 20),
            y: 200
        });
    }
    
    boxes.push({
        x: 49 * 20,
        y: 200
    });
    
    for (var i = 0; i < 16; i++) {
        boxes.push({
            x: (i * 20) + 20,
            y: 220
        });
    }
    
}

function drawBoxes() {
    for (var i = 120; i < boxes.length; i++) {
        ctx.drawImage(box, boxes[i].x, boxes[i].y);
    }
}