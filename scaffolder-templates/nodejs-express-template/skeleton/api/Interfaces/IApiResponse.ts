export interface ApiResponse {
  status: {
    statusCode: string,
    message: string,
  },
  formulaDetails?: Array<Object>
}

interface ConversionFactor {
  code: string,
  value: number
}

export interface CurrencyApiResponse {
  meta: {
    last_updated_at: string,
  },
  data: { [key: string]: ConversionFactor }
}
