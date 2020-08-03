document.addEventListener('DOMContentLoaded',() => {

    const grid = document.getElementById('grid');
    const scoreDisplay = document.getElementById('score');
    const width = 8;
    let squares = [];
    let score = 0;

    const candyColor = [
        'red','orange','yellow','goldenrod','purple','pink'
    ];

    function createBoard()
    {
        for (let i = 0; i < width * width; i++) {
            const square = document.createElement('div');
            square.setAttribute('draggable',true);
            square.setAttribute('id',`${i}`);
            let random = Math.floor(Math.random() * candyColor.length)
            square.style.backgroundColor = candyColor[random];
            grid.appendChild(square);
            squares.push(square);

        }
    }

    createBoard();


    function moveCandiesDown() {
        for(let i = 0; i< 55; i++) {
           if(squares[i+width].style.backgroundColor === '') {
               squares[i + width].style.backgroundColor = squares[i].style.backgroundColor;
               squares[i].style.backgroundColor = '';
               const firstRow = [0,1,2,3,4,5,6,7];
               const isFirstRow = firstRow.includes(i);
               if(isFirstRow && squares[i].style.backgroundColor === '') {
                   let randomColor = Math.floor(Math.random() * candyColor.length);
                   squares[i].style.backgroundColor = candyColor[randomColor];
               }
           }
        }
    }

    //drag feature

    let colorBeingDragged;
    let colorBeingReplaced;
    let squareIdBeingDragged;
    let squareIdBeingReplaced;

    squares.forEach( square => square.addEventListener('dragstart',dragstart));
    squares.forEach( square => square.addEventListener('dragend',dragend));
    squares.forEach( square => square.addEventListener('dragover',dragover));
    squares.forEach( square => square.addEventListener('dragenter',dragenter));
    squares.forEach( square => square.addEventListener('dragleave',dragleave));
    squares.forEach( square => square.addEventListener('drop',dragDrop));

    function dragstart()
    {
        colorBeingDragged = this.style.backgroundColor;
        squareIdBeingDragged = parseInt(this.id);
    }

    function dragover(e)
    {
        e.preventDefault();
    }

    function dragenter(e)
    {
        e.preventDefault();
    }

    function dragleave()
    {

    }

    function dragDrop()
    {
        colorBeingReplaced =  this.style.backgroundColor;
        squareIdBeingReplaced = parseInt(this.id);
        this.style.backgroundColor = colorBeingDragged;
        squares[squareIdBeingDragged].style.backgroundColor = colorBeingReplaced;
    }

    function dragend()
    {
        let validMoves = [
            squareIdBeingDragged - 1,
            squareIdBeingDragged - width,
            squareIdBeingDragged + 1,
            squareIdBeingDragged + width];

        let validMove = validMoves.includes(squareIdBeingReplaced);

        if(squareIdBeingReplaced && validMove) {
            squareIdBeingReplaced = null;
        } else if(squareIdBeingReplaced && !validMove) {
            squares[squareIdBeingReplaced].style.backgroundColor = colorBeingReplaced;
            squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged;
        } else {
            squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged;
        }
    }

    //match
    //match row

    function checkRowForThree()
    {
        for(let i = 0; i< 61; i++) {
            let rowOfThree = [i,i+1,i+2];
            let decidedColor = squares[i].style.backgroundColor;
            const isBlank = squares[i].style.backgroundColor === '';

            const notValid = [6,7,14,15,22,23,30,31,38,39,46,47,54,55];
            if(notValid.includes(i)) { continue; }

            if(rowOfThree.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
                score += 3;
                rowOfThree.forEach(index => {
                    squares[index].style.backgroundColor = '';
                });
            }
        }
    }

    //match column
    function checkColumnForThree()
    {
        for(let i = 0; i< 47; i++) {
            let columnOfThree = [i,i+width,i+width*2];
            let decidedColor = squares[i].style.backgroundColor;
            const isBlank = squares[i].style.backgroundColor === '';

            if(columnOfThree.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
                score += 3;
                columnOfThree.forEach(index => {
                    squares[index].style.backgroundColor = '';
                });
            }
        }
    }

    //match for row
    function checkRowForFour()
    {
        for(let i = 0; i< 60; i++) {
            let rowOfFour = [i,i+1,i+2,i+3];
            let decidedColor = squares[i].style.backgroundColor;
            const isBlank = squares[i].style.backgroundColor === '';

            const notValid = [5,6,7,13,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55];
            if(notValid.includes(i)) { continue; }

            if(rowOfFour.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
                score += 4;
                rowOfFour.forEach(index => {
                    squares[index].style.backgroundColor = '';
                });
            }
        }
    }

    //match column
    function checkColumnForFour()
    {
        for(let i = 0; i< 46; i++) {
            let columnOfFour = [i,i+width,i+width*2,i+width*3];
            let decidedColor = squares[i].style.backgroundColor;
            const isBlank = squares[i].style.backgroundColor === '';

            if(columnOfFour.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
                score += 4;
                columnOfFour.forEach(index => {
                    squares[index].style.backgroundColor = '';
                });
            }
        }
    }


    window.setInterval(function () {

        moveCandiesDown();

        checkRowForFour();
        checkColumnForFour();

        checkRowForThree();
        checkColumnForThree();
    },100)
})