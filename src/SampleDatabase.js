import mongoose from "mongoose";
import load from "call-dir";
import {resolve} from 'path';
/**
 * @example Using models
 * const User = db.get("user");
 *
 *
 * @class   {Database}
 * @export  {Database}
 * @access  public
 */

export class Database {
  /**
   * Imported models.
   *
   * @type    {Object}
   * @access  private
   */
  models = {};

  /**
   * Connection to database.
   *
   * @access  public
   */
  connection = null;

  /**
   * Creates a connection to a database.
   *
   * @param   {Object}    config              Configuration object
   * @param   {string}    config.host         Database host
   * @param   {string}    config.port         Database port
   * @param   {string}    config.username     Database username
   * @param   {string}    config.password     Database password
   * @param   {string}    config.database     Database name
   */
  constructor(config = {}) {
    this.config = config;
    this.mongoose = mongoose;
  }

  /**
   * Connects to a database and loads all the models.
   *
   * @return  {Promise}
   * @access  private
   */
  connect() {
    return new Promise((resolve, reject) => {
      try {
        const { database, username, password, host, port } = this.config;
        this.mongoose.connect(`mongodb://${host}:${port}/${database}`, { useNewUrlParser: true } );
        this.connection = mongoose.connection;
        
        resolve(this.mongoose)
      } catch (err) {
        reject(err)
      }
    });
  }


  /**
   * Loads a model and saved it for further usage.
   *
   * @param   {string}  resource
   * @return  {void}
   * @access  public
   */
  load(resource) {
    this.models[resource.modelName] = this.mongoose.model(resource.modelName, resource.schema)
  }


  get(name) {
    if (!(name in this.models)) {
      // @todo create custom error class
      throw new Error(`Model "${name}" not defined`);
    }

    return this.models[name];
  }
}


export function initDatabase(dependencies, dbConfig) {
  if (!dependencies.logger) {
    dependencies.logger = console;
  }

  const db = new Database(dbConfig);
  try {
    load(resolve(__dirname, "api/models"), (src) => {
      db.load(require(src).default(db.mongoose)); // Change to your DB Driver
    });
  } catch (error) {
    dependencies.logger.error(error);
  }

  return db;
}