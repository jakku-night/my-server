const db = require('../db');
const crud = {};
var OK = {
    status: "OK"
};
var ERROR = {
    status: "ERROR"
};
ERROR = JSON.stringify(ERROR);
OK = JSON.stringify(OK);

// Rows:
crud.get_all = async (table = '') => { // Fetchs all the rows of a table
    if(table === ''){
        console.error("[ERROR]: PARAMETERS ARE IN BLANK!!!");
        return ERROR;
    }else{
        try {
            const rows = await db.query("SELECT * FROM " + table);
            if(!rows.length){
                console.error("[ERROR]: DATA NOT FOUND OR NOT EXISTS");
                return ERROR;
            }else{
                console.log("[SUCCESS]: QUERY OK");
                return JSON.stringify(rows);
            }
        } catch (error) {
            console.error("[ERROR]: FATAL ERROR");
            console.error(error);
        }
    }
};
crud.search_row = async (table = '', key = '', value = '') => { // Search a set of rows by the given key from a table
    if(table === '' || key === '' || value === ''){
        console.error("[ERROR]: PARAMETERS ARE IN BLANK!!!");
        return ERROR;
    }else{
        try {
            const rows = await db.query("SELECT * FROM " + table + " WHERE " + key + " LIKE ?", [value]);
            if(!rows.lenght){
                console.error("[ERROR]: DATA NOT FOUND OR NOT EXISTS");
                return ERROR;
            }else{
                console.log("[SUCCESS]: QUERY OK");
                return JSON.stringify(rows);
            }
        } catch (error) {
            console.error("[ERROR]: FATAL ERROR");
            console.error(error);
        }
    }
};
crud.add_row = async (table = '', new_data = {}) => { // Adds a new row to a table
    if(table === '' || new_data === {}){
        console.error("[ERROR]: PARAMETERS ARE IN BLANK!!!");
        return ERROR;
    }else{
        try {
            const rows = await db.query("INSERT INTO " + table + " SET ?", [new_data]);
            if(!rows.insertId){
                console.error("[ERROR]: ROW NOT INSERTED");
                return ERROR;
            }else{
                console.log("[SUCCESS]: QUERY OK");
                return OK;
            }
        } catch (error) {
            console.error("[ERROR]: FATAL ERROR");
            console.error(error);
        }
    }
};
crud.edit_row = async (table = '', new_data = {}, id = '') => { // Edits the data of one row in a table
    if(table === '' || new_data === {} || id === ''){
        console.error("[ERROR]: PARAMETERS ARE IN BLANK!!!");
        return ERROR;
    }else{
        try {
            const rows = await db.query("UPDATE " + table + " SET ? WHERE id = ?", [new_data, id]);
            console.log(rows);
            if(!rows.affectedRows){
                console.error("[ERROR]: ROW NOT UPDATED");
                return ERROR;
            }else{
                console.log("[SUCCESS]: QUERY OK");
                return OK;
            }
        } catch (error) {
            console.error("[ERROR]: FATAL ERROR");
            console.error(error);
        }
    }
};
crud.delete_row = async (table = '', id = '') => { // Deletes a row from a table
    if(table === '' || id === ''){
        console.error("[ERROR]: PARAMETERS ARE IN BLANK!!!");
        return ERROR;
    }else{
        try {
            const rows = await db.query("DELETE FROM " + table + " WHERE id = ?", [id]);
            if(!rows.affectedRows){
                console.error("[ERROR]: DATA NOT FOUND OR NOT EXISTS");
                return ERROR;
            }else{
                console.log("[SUCCESS]: QUERY OK");
                return OK;
            }
        } catch (error) {
            console.error("[ERROR]: FATAL ERROR");
            console.error(error);
        }
    }
};
// Tables:
crud.create_table = async (table = '') => { // Creates a new table with an id field 
    if(table === '' || table == null){
        console.error('[ERROR]: PARAMS ARE IN BLANK');
        return ERROR;
    }else{
        try{
            const state = await db.query('CREATE TABLE IF NOT EXISTS ' + table + '(id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT)');
            console.log('[SUCCESS]: QUERY OK');
        }catch(error){
            console.error(error);
        }
    }
};
crud.alter_table = async (table = '', columns_to_add = [], columns_to_delete = [], columns_to_modify = [], constraints = []) => {};
crud.drop_table = async (table = '') => {};
crud.describe_table = async (table = '') => {};

module.exports = crud;