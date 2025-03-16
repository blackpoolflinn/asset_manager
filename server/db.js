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
    async search(q, params){
        try {
            const statement = database.prepare(q)
            let data = statement.all(params);
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
            console.log(data)
            return data;
        } catch (error) {
            console.error(error)
        }
    }

}

const db = new DB() //singleton
module.exports = db