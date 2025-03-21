import { useQuery } from "@tanstack/react-query"

const useUsers = () => {
    return useQuery({
        queryKey: ['userData'], //query key is neccesary for express session
        queryFn: () =>
            fetch('/api/session').then((res) => //fetches session data on whether the user is logged in or not as a boolean value called isAuthenticated
            res.json(), //json response
            ),
    })
    
}

export default useUsers