const oracledb = require('oracledb');
//oracledb.outFormat = oracledb.OBJECT;
//oracledb.autoCommit = true;

class Repository {

    constructor() {
        //this.connection = undefined;
    }
    options = {
        outFormat: oracledb.OUT_FORMAT_OBJECT
    }


    // creates connection pool for oracledb
    startup = async function () {
        console.log('starting up database.');
        try {
            
            await oracledb.createPool({
                user: "RIDE",//process.env.DB_USER,
                password:"235711",// process.env.DB_PASS,
                connectstring: "localhost/orclpdb",//process.env.DB_CONNECT_STRING,
                poolMin: 4,
                poolMax: 10,
                poolIncrement: 1
            });
            console.log('pool created');
        }
        catch(err) {
            console.log('what just happened '+err.stack);
        
        }
    }

    // closes connection pool for oracledb
    shutdown = async function () {
        console.log('shutting down database.');
        try {
            // If this hangs, you may need DISABLE_OOB=ON in a sqlnet.ora file.
            await oracledb.getPool().close(10);
            console.log('Pool closed');
        } catch (err) {
            console.log("ERROR shutting down database: " + err.message);
        }
    }

    // code to execute sql
    execute = async function (sql, binds, options) {
        let connection, results;
        try {
            // Get a connection from the default pool
            connection = await oracledb.getConnection();
            results = await connection.execute(sql, binds, options);
        } catch (err) {
            console.log("ERROR executing sql: " + err.message);
        } finally {
            if (connection) {
                try {
                    // Put the connection back in the pool
                    await connection.close();
                } catch (err) {
                    console.log("ERROR closing connection: " + err);
                }
            }
        }
        return results;
    }

    // code to execute many sql
    executeMany = async function (sql, binds, options) {
        let connection;
        try {
            // Get a connection from the default pool
            connection = await oracledb.getConnection();
            await connection.executeMany(sql, binds, options);
        } catch (err) {
            console.log("ERROR executing sql: " + err.message);
        } finally {
            if (connection) {
                try {
                    // Put the connection back in the pool
                    await connection.close();
                } catch (err) {
                    console.log("ERROR closing connection: " + err);
                }
            }
        }

        return;
    }


    // options for execution sql

};

exports.Repository = Repository;


// JWT token
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.3liebX5UMVR45SEmCYeM2YOTSEFDiDSP4FnUMrpMepU