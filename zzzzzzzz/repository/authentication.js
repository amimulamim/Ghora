const Repository = require('./base').Repository;
class AuthRepository extends Repository {
    constructor() {
        super();
    }

    // function to get id from email
    getUserIDByEmail = async function (email) {
        const sql = `
        SELECT 
            USERNAME
        FROM 
            USERS
        WHERE 
            EMAIL = :email
        `;
        const binds = {
            email: email
        }

        return (await Repository.execute(sql, binds, Repository.options)).rows;
    }

    // function to creat new user
    // user should have handle, email, pass, dob
    // {id} will be returned
    createNewUser = async function (user) {
        const sql = `
        INSERT INTO
            USERS(NAME,EMAIL, PASSWORD,ADDRESS)
        VALUES 
            (:name,:email,:password,:address)
    `;
        const binds = {
            name: user.name,
            email: user.email,
            password: user.password,
            address: "user.address",
        }
        return await Repository.execute(sql, binds, {});
    }

    // return login info (id, handle, password) from handle
    getLoginInfoByEmail = async function (email) {
        const sql = `
        SELECT 
            ID,
            NAME,
            PASSWORD
        FROM
            DRIVER
        WHERE
            EMAIL = :email
    `;
        const binds = {
            email: email
        }

        return (await Repository.execute(sql, binds, Repository.options)).rows;
    }

    getLoginInfoByUsername = async function (username) {
        const sql = `
        SELECT 
            USERNAME,
            NAME,
            PASSWORD,
            EMAIL
            --IMAGE
        FROM
            USERS
        WHERE
            LOWER(USERNAME) = LOWER(:username)
    `;
        const binds = {
            username: username
        }

        return (await Repository.execute(sql, binds, Repository.options)).rows;
    }

};


exports.AuthRepository = AuthRepository;