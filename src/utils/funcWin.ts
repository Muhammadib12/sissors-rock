export const Win = (chois: string): { result: string, computerChoice: string } => {
    const com: string[] = ['s', 'r', 'p'];
    const randomChoice = com[Math.floor(Math.random() * com.length)];

    let result = '';

    if (chois === randomChoice) {
        result = 'Draw';
    } else if (
        (chois === 's' && randomChoice === 'p') ||
        (chois === 'r' && randomChoice === 's') ||
        (chois === 'p' && randomChoice === 'r')
    ) {
        result = 'win';
    } else {
        result = 'lose';
    }

    

    return {
        result,
        computerChoice: randomChoice
    };
};
