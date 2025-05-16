// src/app/api/management/manager/delete/route.js
import db from "@/api/db"

export async function DELETE(request) {
  // 요청 URL에서 쿼리 파라미터 추출
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  const connection = await db.getConnection();
  try {
    // MySQL 연결 획득
    // 관리자 정보 삭제
    await connection.execute('DELETE FROM admin_info WHERE id = ?', [id]);
    // MySQL 연결 해제
    // await connection.end();
    
    // 성공 시 빈 응답(204 No Content) 반환
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error('관리자 정보 삭제 중 오류 발생:', error);
    // 오류 발생 시 JSON 형태로 에러 메시지와 함께 500 응답 반환
    return new Response(
      JSON.stringify({ message: '서버 오류' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } finally {
    connection.release(); // 반드시 연결 반환
  }
}
