import axios from 'axios'
import { OptimizationResult } from '@/types'

const API_BASE = '/api'

const client = axios.create({
  baseURL: API_BASE,
  timeout: 30000,
})

export interface OptimizeRequest {
  materials: any[]
  components: any[]
  constraints: {
    kerf: number
    edgeMargin: number
    allowRotation: boolean
  }
}

export const optimizationAPI = {
  optimize: async (request: OptimizeRequest): Promise<OptimizationResult> => {
    const response = await client.post('/optimize', request)
    return response.data
  },

  health: async (): Promise<boolean> => {
    try {
      const response = await client.get('/health')
      return response.status === 200
    } catch {
      return false
    }
  },
}

export default client
