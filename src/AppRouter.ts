import express from 'express';

export class AppRouter {
  private static instance: express.Router; // static method use to access method within AppRouter without make an instance of it

  static getInstance(): express.Router {
    // inside this method we're gonna check to see if we have an instance available 
    // if we do we're going to return it automatically right away 
    // otherwise we're going to create an instance immediately and return that new instance we just created.
    if (!AppRouter.instance) {
      AppRouter.instance = express.Router()
    }

    return AppRouter.instance
  }
}