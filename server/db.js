'use strict';
const express = require('express')
const { DatabaseSync } = require('node:sqlite');
const app = express()
const database = new DatabaseSync('data.db');

class DB {

    constructor() {
        database.exec(`
            CREATE TABLE IF NOT EXISTS "Users" (
                "user_id" INTEGER PRIMARY KEY AUTOINCREMENT,
                "username" TEXT NOT NULL,
                "password" TEXT NOT NULL
            );
        `);
        
        database.exec(`
            CREATE TABLE IF NOT EXISTS "Products" (
                "product_id" INTEGER PRIMARY KEY AUTOINCREMENT,
                "product_name" TEXT NOT NULL,
                "product_cost" REAL NOT NULL,
                "product_description" TEXT,
                "product_vendor" TEXT,
                "product_count" INTEGER NOT NULL,
                "user_id" INTEGER NOT NULL,
                FOREIGN KEY ("user_id") REFERENCES "Users" ("user_id") ON DELETE CASCADE
            );
        `);
    }

    /**
     * Private function to handle pool connections and query errors
     * @param {*string} query 
     * @param {*string} params 
     * @returns data from executed query
     */
    async searchAll(q, params){
        try {
            const statement = database.prepare(q)
            let data = statement.all(params);
            return data;
        } catch (error) {
            console.error(error)
        }
    }

    async search(q, params){
        try {
            const statement = database.prepare(q)
            let data = statement.get(params);
            return data;
        } catch (error) {
            console.error(error)
        }
    }

    async insert(q, params){
        try {
            const statement = database.prepare(q)
            const data = statement.run(...params);
            return data;
        } catch (error) {
            console.error(error)
        }
    }

    async delete(q, params){
        try {
            const statement = database.prepare(q)
            const data = statement.run(...params);
            return data;
        } catch (error) {
            console.error(error)
        }
    }

}

const db = new DB() //singleton
module.exports = db