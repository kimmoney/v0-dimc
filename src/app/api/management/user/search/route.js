// /src/app/api/management/manager/search/route.js
import db from "@/api/db"
export async function GET(request) {
  // 1. 요청 URL에서 쿼리 파라미터 추출
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id') || '';
  const limit = searchParams.get('limit') || '10';
  const page = searchParams.get('page') || '1';
  const name = searchParams.get('name') || '';
  const userId = searchParams.get('userId') || '';
  const number = searchParams.get('number') || '';
  const min_age = searchParams.get('min_age') || '';
  const max_age = searchParams.get('max_age') || '';
  let course_type = searchParams.get('course_type') || '';
  let gender = searchParams.get('gender') || '';
  let status = searchParams.get('status') || '';
  let dimc = searchParams.get('dimc') || '';
  dimc = JSON.parse(dimc)
  status = status.trim();
  gender = gender.trim();
  course_type = course_type.trim();
  const min_year = new Date().getFullYear() - parseInt(min_age, 10);
  const max_year = new Date().getFullYear() - parseInt(max_age, 10);
  const limitInt = parseInt(limit, 10);
  const pageInt = parseInt(page, 10);
  const offset = (pageInt - 1) * limitInt;
  
  let conditions = 'WHERE 1=1';
  let queryParams = [];
  if (id) {
    conditions += ' AND user_id = ?';
    queryParams.push(`${name}`);
  }
  if (name) {
    conditions += ' AND name LIKE ?';
    queryParams.push(`%${name}%`);
  }
  if (userId) {
    conditions += ' AND site_id LIKE ?';
    queryParams.push(`%${userId}%`);
  }
  if (number) {
    conditions += ' AND number LIKE ?';
    queryParams.push(`%${number}%`);
  }
  if (course_type) {
    conditions += ' AND `course_type` = ?';
    queryParams.push(course_type);
  }
  if (gender) {
    conditions += ' AND gender = ?';
    queryParams.push(gender);
  }
  if (dimc.D) {
    conditions += " AND dt.d_type COLLATE utf8mb4_unicode_ci   in ('"+dimc.D.replace(" : ","").replace(", ","','").replace(", ","','").replace(", ","','")+"')";
  }
  if (dimc.I) {
    conditions += " AND dt.i_type COLLATE utf8mb4_unicode_ci   in ('"+dimc.I.replace(" : ","").replace(", ","','").replace(", ","','").replace(", ","','")+"')";
  }
  if (dimc.M) {
    conditions += " AND dt.m_type COLLATE utf8mb4_unicode_ci   in ('"+dimc.M.replace(" : ","").replace(", ","','").replace(", ","','").replace(", ","','")+"')";
  }
  if (dimc.C) {
    conditions += " AND dt.c_type COLLATE utf8mb4_unicode_ci   in ('"+dimc.C.replace(" : ","").replace(", ","','").replace(", ","','").replace(", ","','")+"')";
  }
  if (min_year) {
    conditions += " AND birthdate <= ?";
    queryParams.push(min_year.toString()+"-12-31");
  }
  if (max_year) {
    conditions += " AND birthdate >= ?";
    queryParams.push(max_year.toString()+"-01-01");
  }
  const connection = await db.getConnection();
  try {
    // 4. MySQL 연결 획득
    const rowQuery = `SELECT ui.user_id,ui.name,ui.site_id,ui.number,ui.birthdate,ui.gender,ci.course_type,dt.d_type,dt.i_type,dt.m_type,dt.c_type  
    FROM user_info ui
          NATURAL JOIN parent_info pi
          NATURAL JOIN cource_info ci
          JOIN (
              SELECT dt1.*
              FROM dimc_type_view dt1
              INNER JOIN (
                  SELECT user_id, MAX(testdate) AS max_testdate
                  FROM dimc_type_view
                  GROUP BY user_id
              ) latest
                ON dt1.user_id = latest.user_id
              AND dt1.testdate = latest.max_testdate
          ) dt ON ui.user_id = dt.user_id `
    // 5. 전체 레코드 수 조회 (페이지네이션 처리를 위해)
    // console.log(`SELECT COUNT(*) as count FROM (${rowQuery}) AS sub ${conditions}`)
    // const [countRows] = await connection.execute(
    //   `SELECT COUNT(*) as count FROM (${rowQuery}) AS sub ${conditions}`,
    //   queryParams
    // );
    console.log({conditions: conditions})
    console.log({queryParams: queryParams})
    const [result] = await connection.execute(rowQuery + conditions, queryParams);
    const totalCount = result.length;
    // console.log(totalCount)
    const totalPages = Math.ceil(totalCount / limitInt);

    // 6. 조건과 페이지네이션 적용하여 데이터 조회
    // LIMIT과 OFFSET 값은 숫자이므로 쿼리문에 직접 삽입
    const query = rowQuery+ `${conditions} LIMIT ${limitInt} OFFSET ${offset}`;
    const [rows] = await connection.execute(query, queryParams);
    // console.log(rows)

    // 연결 종료
    // await connection.end();
    // console.log(rows);
    // 7. 결과 반환
    return new Response(
      JSON.stringify({
        users: rows,
        totalPages,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error("DB query error:", error);
    return new Response(
      JSON.stringify({ error: '서버 에러' }),
      { status: 500 }
    );
  } finally {
    connection.release(); // 반드시 연결 반환
    console.log("connection released")
  }
}
