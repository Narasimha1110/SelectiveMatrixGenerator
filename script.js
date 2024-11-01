document.addEventListener("DOMContentLoaded", function () 
{
    // Create the main grid
    const rows = 20;// DEFINING THE ROW VALUE AS 20
    const columns = 16;// DEFINING COLUMN VALUE AS 16
    const gridSize = rows * columns; // DEFINING GRID SIZE AS 20X16

    const gridContainer = d3.select("#grid-container"); //CREATING D3 OBJECT FROM d3 container

    for (let i = 0; i < gridSize; i++) 
    {                                               //ITERATING THROUGH THE GRID CONTAINER  OVER GRID SIZE
        gridContainer.append("div")
            .attr("class", "cell")
            .attr("id", "cell-" + i);
    }

    document.getElementById("generateButton").addEventListener("click", generateSubmatrices);  //GETTING ELEMENT BY CLICKING GENERATE BUTTON

    function generateSubmatrices()
     {  //FUNCTION TO GENERATE SUB MATRICES
        const submatrixCount = parseInt(document.getElementById("submatrixCount").value);

        // Clear the grid
        gridContainer.selectAll(".cell").style("background-color", "#fff");

        if (submatrixCount > 0) 
        {
            generateUniqueSubmatrices(submatrixCount);
        }
    }

    function getRandomColor() 
    {                                                                           // METHOD TO ASSIGN RANDOM COLOUR TO SUBMATRICES
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) 
        {                                                                      //COLLETING DIFFERENT COLOURS
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function generateUniqueSubmatrices(count)
     {                                                                          // METHOD TO GENERATE UNIQUE SUBMATRICES
        const submatrices = []; // DEFINING LIST OF SUBMATRICES

        for (let i = 0; i < count; i++) 
        {                                                                       //ITERATING OVER COUNT
            const submatrixSize = getRandomSubmatrixSize();                     //GETTING RANDOM SIZE FOR SUBMATRIX
            const color = getRandomColor();                                     //GETTING RANDOM COLOUR FOR SUBMATRIX

            // Find a valid position for the submatrix
            const { startX, startY, numCols, numRows } = findValidPosition(submatrixSize.width, submatrixSize.height, submatrices); //FINDING VALID POSITION FOR SUBMATRIX

            if (startX !== -1) 
            {
                submatrices.push({ startX, startY, numCols, numRows });
                fillSubmatrix(startX, startY, numCols, numRows, color);
            } 
            else 
            {
                // If it's not possible to place more submatrices, break out of the loop
                break; //BREAKING THE LOOP WHEN THERE IS NO POSSIBILITIES TO PLACE MORE SUBMATRICES
            }
        }
    }

    function getRandomSubmatrixSize() 
    {   //METHOD TO GET THE RANDOM SUB MATRIX SIZE
        return {
            width: Math.floor(Math.random() * (columns / 2)) + 1,    // RETURNING WIDTH
            height: Math.floor(Math.random() * (rows / 2)) + 1       // RETURNING HEIGHT
        };
    }

    function findValidPosition(width, height, submatrices)
     {                                                              // METHOD THAT WILL FINE A VALID POSITION TO PLACE THE SUBMATRIX
        for (let y = 0; y <= rows - height; y++) {
            for (let x = 0; x <= columns - width; x++) 
            {
                if (!isOccupied(x, y, width, height, submatrices)) 
                {
                    return { startX: x, startY: y, numCols: width, numRows: height };    // MAKING DECESION WHETHER GIVEN COORDINATES IS A VALID POSITION OR NOT
                }
            }
        }
        return { startX: -1, startY: -1, numCols: 0, numRows: 0 }; // WHEN NO VALID LOCATION IS FOUND
    }

    function isOccupied(x, y, width, height, submatrices)          // FUNCTION THAT CHECKS WHETHER FOUND POSITION IS OCCUPIED OR NOT
    {
        for (let row = y; row < y + height; row++) 
        {
            for (let col = x; col < x + width; col++)
             {
                for (const submatrix of submatrices) 
                {
                    if (
                        row >= submatrix.startY &&
                        row < submatrix.startY + submatrix.numRows &&
                        col >= submatrix.startX &&
                        col < submatrix.startX + submatrix.numCols
                    ) 
                    {
                        return true;                               //RETURNING TRUE IT IS IS OCCUPIED
                    }
                }
            }
        }
        return false;                                              //RETURNIONG FALSE IF IT IS NOT OCCUPIED
    }

    function fillSubmatrix(x, y, width, height, color)
     {                                                              // METHOD TO FILL THE SUBMATRIX WITH RANDOMLY GENERATED METHOD
        for (let row = y; row < y + height; row++) 
        {
            for (let col = x; col < x + width; col++)
             {
                d3.select("#cell-" + (row * columns + col)).style("background-color", color);      //COLOURING THE CELL WITH RANDOM COLOUR
            }
        }
    }
});
