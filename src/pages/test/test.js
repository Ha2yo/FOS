const Database = window.__TAURI__.sql;

console.log("test page loded")

let insert;

// 버튼 클릭 이벤트 감지
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btnInsert").addEventListener("click", dbtest_insert)
    document.getElementById("btnUpdate").addEventListener("click", dbtest_update)
    //document.getElementById("btnDelete").addEventListener("click", dbtest_update)    
    document.getElementById("btnSelect").addEventListener("click", dbtest_select)
})

async function getDB() {
  return await Database.load("mysql://root:8630@10.0.2.2:3306/FOS_DB");
}

// CREATE
async function dbtest_insert() {
  console.log("execute dbtest_insert");

  const name = document.getElementById("nameInput").value;

  try {
    const db = await getDB();
    await db.execute(
      "INSERT INTO test (names) VALUES (?)", [name]
    );
  } catch (err) {
    console.error("DB error:", err);
  }
}

// UPDATE
async function dbtest_update() {
  console.log("execute dbtest_upate");

  const id = document.getElementById("updateId").value;
  const newName = document.getElementById("updateName").value;

  try {
    const db = await getDB();
    await db.execute(
      "UPDATE test SET names = ? WHERE id = ?", [newName, id]
    );
  } catch (err) {
    console.error("DB error:", err);
  }
}
/*
// DELETE
async function dbtest_delete() {
  console.log("execute dbtest_delete");

  const id2 = document.getElementById("deleteId").value;

  try {
    const db = await getDB();
    await db.execute(
      "DELETE FROM test WHERE id = ?", [id2]
    );
  } catch (err) {
    console.error("DB error:", err);
  }
}
*/

// READ
async function dbtest_select() {
  console.log("execute dbtest_select");

  try {
    const db = await getDB();
    const rows = await db.select("SELECT * FROM test");

    let resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `
      <h3>Query result</h3>
      <pre>${JSON.stringify(rows, null, 2)}</pre>
    `;

  } catch (err) {
    console.error("DB error:", err);
  }
}