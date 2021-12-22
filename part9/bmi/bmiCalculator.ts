interface bmiArgs {
    height: number;
    weight: number;
}

export const calculateBmi = (height: number, weight: number): string => {
    const heightInMeters: number = height / 100;
    const bmi: number = weight / (heightInMeters * heightInMeters);
    switch (true) {
        case (bmi < 16.0): 
            return ("Underweight (Severe thinness)");	
        case (bmi <= 16.9):
            return ("Underweight (Moderate thinness)");
        case (bmi <= 18.4):
            return ("Underweight (Mild thinness)");
        case (bmi <= 24.9):
            return ("Normal range");
        case (bmi <= 29.9):
            return ("Overweight (Pre-obese)");
        case (bmi <= 34.9):
            return ("Obese (Class I)");
        case (bmi <= 39.9):
            return ("Obese (Class II)");
        case (bmi >= 40.0):
            return ("Obese (Class III)");
        default:
            throw new Error('Input weight or height is invalid!');
    }
};

const parseArguments = (args: Array<string>): bmiArgs => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
  
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        height: Number(args[2]),
        weight: Number(args[3])
      };
    } else {
      throw new Error('Provided values were not numbers!');
    }
};

try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if(error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }