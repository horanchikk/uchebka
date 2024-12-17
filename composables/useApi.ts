import type { $Fetch } from 'ofetch'
import { createFetch } from 'ofetch'

export function useApi() {
    const { public: { API_URL } } = useRuntimeConfig()
    
    const api: $Fetch = createFetch({
        defaults: {
            baseURL: API_URL,
        },
    })

    return { api }
}