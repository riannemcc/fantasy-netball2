import { Db, MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export interface ApiRequest extends NextApiRequest {
  dbClient: MongoClient;
  db: Db;
}

export type ApiResponse = NextApiResponse;
