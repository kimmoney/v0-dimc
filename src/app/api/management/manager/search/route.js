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
  const phone = searchParams.get('phone') || '';
  let rank = searchParams.get('rank') || '';
  let role = searchParams.get('role') || '';
  let status = searchParams.get('status') || '';
  status = status.trim();
  role = role.trim();
  rank = rank.trim();
  

  const limitInt = parseInt(limit, 10);
  const pageInt = parseInt(page, 10);
  const offset = (pageInt - 1) * limitInt;

  
  let conditions = 'WHERE 1=1';
  let queryParams = [];
  if (id) {
    conditions += ' AND id = ?';
    queryParams.push(`${name}`);
  }
  if (name) {
    conditions += ' AND admin_name LIKE ?';
    queryParams.push(`%${name}%`);
  }
  if (userId) {
    conditions += ' AND site_id LIKE ?';
    queryParams.push(`%${userId}%`);
  }
  if (phone) {
    conditions += ' AND phone_number LIKE ?';
    queryParams.push(`%${phone}%`);
  }
  if (rank) {
    conditions += ' AND `rank` = ?';
    queryParams.push(rank);
  }
  if (role) {
    conditions += ' AND role = ?';
    queryParams.push(role);
  }
  if (status) {
    conditions += ' AND status = ?';
    queryParams.push(status);
  }

  const connection = await db.getConnection();
  try {
    // 4. MySQL 연결 획득

    // 5. 전체 레코드 수 조회 (페이지네이션 처리를 위해)
    const [countRows] = await connection.execute(
      `SELECT COUNT(*) as count FROM admin_info ${conditions}`,
      queryParams
    );
    const totalCount = countRows[0].count;
    const totalPages = Math.ceil(totalCount / limitInt);

    // 6. 조건과 페이지네이션 적용하여 데이터 조회
    // LIMIT과 OFFSET 값은 숫자이므로 쿼리문에 직접 삽입
//     admin_name: "관리자17"
// ​​​
// email: "admin17@example.com"
// ​​​
// id: 25
// ​​​
// password: "$2a$10$gWMf2mXjj1Hg3clAOMJfTeKckUk3bJLrFGDOQGDu3ruQuX4dv/zoy"
// ​​​
// phone_number: "01080808080"
// ​​​
// rank: "개발자"
// ​​​
// role: "관리자"
// ​​​
// site_id: "id25"
// ​​​
// status: "정상"
    const query = `SELECT admin_name,id,phone_number,email,role,\`rank\`,status,site_id FROM admin_info ${conditions} ORDER BY id LIMIT ${limitInt} OFFSET ${offset}`;
    const [rows] = await connection.execute(query, queryParams);

    // 연결 종료
    // await connection.end();
    // console.log(rows);
    // 7. 결과 반환
    return new Response(
      JSON.stringify({
        admins: rows,
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
  }
}
