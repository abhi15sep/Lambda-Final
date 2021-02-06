import middy from 'middy';
import {
  httpEventNormalizer,
  jsonBodyParser,
  httpErrorHandler
} from 'middy/middlewares';

const commonMiddleware = handler =>
  middy(handler)
    .use(httpEventNormalizer())
    .use(jsonBodyParser())
    .use(httpErrorHandler())

export default commonMiddleware;
