import { call } from './util/call';
import { Query } from './query';
import { Meteor } from 'meteor/meteor';

export class Singularity extends Query {
  constructor(collection) {
    super();
    this._collection = collection;
    this.wheres = [];
    this.groups = [];
    this.options = {};
    return this;
  }

  /**
   * Returns the Collection instance
   * @return {Collection} the instance of the Collection
   */
  getCollection() {
    return this._collection;
  }

  /**
   * Returns the result from MongoDB
   * @return {Promise}
   */
  fetch() {
    // create a new promise so we can `fetch` asynchronously
    return this.getCollection().fetch(this.getQuery(), this.getOptions());
  }

  /**
   * Returns the result from MongoDB
   * @return {Promise}
   */
  first() {
    // create a new promise so we can `fetch` asynchronously
    return this.getCollection().first(this.getQuery(), this.getOptions());
  }

  /**
   * Returns the cursor from MongoDB
   * @param  {Object} query    MongoDB query
   * @param  {Object} selector MongoDB field selectors
   * @return {Promise}
   */
  cursor() {
    // return the cursor non-async
    return this.getCollection().getCursor(this.getQuery(), this.getOptions());
  }

  /**
   * Returns the cursor from MongoDB
   * @param  {Object} query    MongoDB query
   * @param  {Object} selector MongoDB field selectors
   * @return {Promise}
   */
  count() {
    // create a new promise so we can `count` asynchronously
    return new Promise((resolve, reject) => {
      try {
        resolve(this.cursor().count());
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
   * Returns an aggregation
   * @param  {Array} args  the aggregation pipeline
   * @return {Promise}
   */
  aggregate(args) {
    if (Meteor.isClient) {
      const collectionName = this.getCollection().getRawCollection()._name;
      return call('aggregate', collectionName, this.getAggregation());
    }
    return this.getCollection().aggregate(args || this.getAggregation());
  }

  /**
   * Create a new document
   * @param  {Object} document document to be inserted
   * @return {Promise}
   */
  create(doc = {}) {
    // create a new promise so we can `insert` asynchronously
    return this.getCollection().create(doc);
  }

  /**
   * Create a new document
   * @param  {Object} document document to be inserted
   * @return {Promise}
   */
  update(query = {}, doc = {}, multi = {}) {
    console.log(query, doc, multi);
    // create a new promise so we can `insert` asynchronously
    return this.getCollection().update(query, doc, multi);
  }
}
