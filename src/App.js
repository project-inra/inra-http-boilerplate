import Server from "inra-server-http"

import { resolve } from "path";

import load from "call-dir";

import body from "koa-body";
import cors from "@koa/cors";
import logger from "koa-logger";
import Koa from "koa";
import Router from 'koa-router';

import errors from "./errors";
import { initDatabase } from "./SampleDatabase";

function initServer(dependencies,config) {

  if (!dependencies.logger) {
    dependencies.logger = console;
  }

  const server = new Server({
    host: config.host,
    port: config.port
  })
  server.config = config;

  server.setEngine(new Koa())
  server.setRouter(new Router())


  for (const dependency in dependencies) {
    server[dependency] = dependencies[dependency];
  }





  server.use(logger());
  server.use(body());
  server.use(cors());
  server.use(errors());

  server.use(server.router.routes());
  server.use(server.router.allowedMethods());

  
  try {
    load(resolve(__dirname, "api/middlewares"), src => server.import(src));
    load(resolve(__dirname,"api/routes"), src => server.import(src));
  } catch (error) {
    dependencies.logger.error(error);
  }

  return server;
}

export default function(serverConfig, dbConfig) {
  const logger = console; // Just Set your fav logger here
  
  const database = initDatabase({logger}, dbConfig );
  const server = initServer({database,logger}, serverConfig);
  
  return new Promise((resolve,reject) => {
    database
    .connect()
    .then(res => {
      server.run(serverConfig.port, function() {
        logger.log(`Server running on ${serverConfig.port}`)
        resolve(server);
      })
    })
    .catch(err => {
      logger.error("A critial error occured on startup");
      logger.error(err);

      reject(err);
    });
  });

}