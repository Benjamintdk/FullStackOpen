import { useMutation, useApolloClient } from "@apollo/client";
import { LOG_IN } from "../graphql/mutations"; 
import useAuthStorage from "./useAuthStorage";

const useSignIn = () => {
    const [ login, result ] = useMutation(LOG_IN);
    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient();

    const signIn = async ({ username, password }) => {
        // call the mutate function here with the right arguments
        const response = await login({ variables: { username, password } });
        if (response.data) {
            const token = response.data?.authorize?.accessToken;
            await authStorage.setAccessToken(token);
            apolloClient.resetStore();
            return true;
          }
      
        return false;
    };

    return [ signIn, result ];
};

export default useSignIn;