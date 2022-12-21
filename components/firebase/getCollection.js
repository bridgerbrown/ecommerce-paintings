import "./firebase.config"
import useSWR from 'swr'

const fetcher = async () => {
    const response = await fetch('https://firestore.googleapis.com/v1/projects/ecommerce-f2425/databases/(default)/documents/paintings')
    const data = await response.json()
    return data
}

export default function getCollection() {
    const { data, error, isLoading } = useSWR('paintings', fetcher)
    return {
        collection: data,
        isError: error,
        isLoading: isLoading
    }
}
