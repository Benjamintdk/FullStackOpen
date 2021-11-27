import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";

const useSignUp = () => {
    const [ createUser, result ] = useMutation(CREATE_USER);

    const addUser = async ({ username, password }) => {
        // call the mutate function here with the right arguments
        const response = await createUser({ variables: { username, password } });
        return response.data ? true : false;
    };

    return [ addUser, result ];
};

export default useSignUp;