const database=require('./database');





async function create(fileName, contentType, contentBuffer) {
    const createSql =
 `insert into jsao_files (
    file_name,
    content_type,
    blob_data
  ) values (
    :file_name,
    :content_type,
    :content_buffer
  ) returning id into :id`;
  const binds = {
    file_name: fileName,
    content_type: contentType,
    content_buffer: contentBuffer,
    id: {
      type: oracledb.NUMBER,
      dir: oracledb.BIND_OUT
    }
  };
  
  result = await database.simpleExecute(createSql, binds);
  
  return result.outBinds.id[0];
}






async function get(id) {
    const getSql =
 `select file_name "file_name",
    dbms_lob.getlength(blob_data) "file_length",
    content_type "content_type",
    blob_data "blob_data"
  from jsao_files
  where id = :id`
  const binds = {
    id: id
  };
  const opts = {
    fetchInfo: {
      blob_data: {
        type: oracledb.BUFFER
      }
    }
  };
  const result = await database.simpleExecute(getSql, binds, opts);
  return result.rows;
}
module.exports.get = get;
module.exports.create = create;


















module.exports.create = create;