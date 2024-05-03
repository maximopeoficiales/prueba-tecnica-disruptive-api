import { fluentProvide } from 'inversify-binding-decorators'
import { Controller, Get, Route, Tags } from 'tsoa'
import { ResponseMessage } from '../../../domain/enums/responseMessage.enum'
import { HttpResponse } from '../../shared/utils/httpResponse'

@Tags('Health Check')
@fluentProvide(HealthController).done()
@Route()
export class HealthController extends Controller {
  @Get()
  async healthCheck(): Promise<HttpResponse<any>> {
    return new HttpResponse({}, ResponseMessage.HEALTH_CHECK)
  }
}
