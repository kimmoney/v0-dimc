import db from "@/api/db"

export async function GET(request) {
  // 요청 URL에서 쿼리 파라미터 추출
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  const connection = await db.getConnection();
  try {
    // MySQL 연결 획득
    // 파라미터 바인딩을 위한 쿼리 작성
    const query = `SELECT * FROM admin_info WHERE id = ?`;
    const [rows] = await connection.execute(query, [id]);
    console.log(rows);
    console.log(id);
    // 연결 종료
    // await connection.end();

    return new Response(
      JSON.stringify({
        admins: rows,
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
