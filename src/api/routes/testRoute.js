import compose from "koa-compose";
import controller, {get} from "inra-server-http/dest/router";
import CustomError from "../errors/CustomError";

@controller("/")
export default class TestRouter {
  
  constructor(dependencies) {
    this.database = dependencies.database;
  }

  @get('')
  async hello(ctx) {
    ctx.body = "Hello World"
  }

  @get('/error')
  async error(ctx) {
    throw new CustomError('Custom')
  }


}