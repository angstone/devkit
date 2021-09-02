import { SIMetricReportType } from '..'

export interface SIIMetricReportPayload {
  save?: boolean
  reportType: SIMetricReportType
  data: any
  dbConnectionString: string
}
