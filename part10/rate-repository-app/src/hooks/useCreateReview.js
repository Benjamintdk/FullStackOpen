import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations"; 

const useCreateReview = () => {
    const [ createReview, result ] = useMutation(CREATE_REVIEW);

    const addReview = async ({ repositoryName, ownerName, rating, text }) => {
        // call the mutate function here with the right arguments
        const response = await createReview({ variables: { repositoryName, ownerName, rating: Number(rating), text } });
        return response ? response : null;
    };

    return [ addReview, result ];
};

export default useCreateReview;