import compose from "koa-compose";
import controller, {get} from "inra-server-http/dest/router";
import NoResultsFoundError from "../errors/NoResultsFoundError";
import NotAllowedError from "../errors/NotAllowedError";

@controller("/test")
export default class TestRouter {
  
  constructor(dependencies) {
    this.database = dependencies.database;
  }

  @get('/hello/:id')
  async hello(ctx) {
    ctx.body =  {
      success: true
    }
  }


}