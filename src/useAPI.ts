import { useNavigate } from "react-router-dom";
import {useToasts} from "react-toast-notifications";


const useAPI = <T, >(apiFunc: (...args: any[]) => Promise<T>): () => Promise<T> => {
    const { addToast } = useToasts()
    const navigate = useNavigate()

    return async (...args: any[]) => {
        try {
            return await apiFunc(...args)
        } catch (e: any) {
            if (e.status) {
                let toastMessage = "internal server error"
                if (e.status === 401) {
                    navigate('/login')
                    toastMessage = "token expired"
                }
                addToast(toastMessage, {
                    appearance: 'error',
                    autoDismiss: true,
                })
            }
            throw e
        }
    }
}

export default useAPI
