'use strict';
const express = require('express')
const { DatabaseSync } = require('node:sqlite');
const app = express()
const database = new DatabaseSync('data.db');

class DB {

    /**
     * Private function to handle pool connections and query errors
     * @param {*string} query 
     * @param {*string} params 
     * @returns data from executed query
     */
    async #query(q, params){
        try {
            const statement = database.prepare(q)
            let data = statement.all();
            return data;
        } catch (error) {
            console.error(error)
        }
    }

    async apply(query, params){
        return this.#query(query, params)
    }

}

const db = new DB() //singleton
module.exports = db