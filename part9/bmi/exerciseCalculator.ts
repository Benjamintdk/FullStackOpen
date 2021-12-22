type Rating = "1" | "2" | "3";

interface Result {
    periodLength: number;
    trainingDays: number;
    target: number;
    average: number;
    success: boolean;
    rating: Rating;
    ratingDescription: string;
}

interface exerciseArgs {
    exerciseHours: Array<number>;
    target: number;
}

export const exerciseCalculator = (exerciseHours: Array<number>, target: number): Result => {

    const periodLength = exerciseHours.length;
    const trainingDays = exerciseHours.filter(hours => hours !== 0).length;
    const average = exerciseHours.reduce((a, b) => a + b, 0) / periodLength;
    const success = average >= target;
    const rating = success ? "3" :
    average > target - 1 ? "2" :
    "1";
    const ratingDescription = success ? 
    "well done you made it!" : 
    "not too bad but could be better";
    return {
        periodLength,
        trainingDays,
        average,
        success,
        rating,
        ratingDescription,
        target
    };
};

const parseArguments = (args: Array<string>): exerciseArgs => {
    if (args.length < 4) throw new Error('Not enough arguments');

    const target = Number(args[2]);
    const exerciseHours = args.slice(3,).map(Number);
  
    if (!isNaN(target)) {
      return {
        target,
        exerciseHours
      };
    } else {
      throw new Error('Provided values were not numbers!');
    }
};

try {
    const { exerciseHours, target } = parseArguments(process.argv);
    console.log(exerciseCalculator(exerciseHours, target));
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if(error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }