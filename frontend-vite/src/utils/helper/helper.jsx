

export const GraphDate = () => {
    let dataG = [];
    for (let num = 30; num >= 1; num--) {
        const currentDate = new Date();  // Get the current date and time
        currentDate.setDate(currentDate.getDate() - num + 1);  // Subtract 'num' days 

        const randomNum = Math.floor(Math.random() * 3) + 1;  // Generate a random number 

        dataG.push({
            date: currentDate.toLocaleDateString(),  // Convert the date to a string in a readable format
            booking: randomNum
        });
    }


    return dataG;
}


