// src/app/api/management-login/signup/route.js
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import db from "@/api/db"
export async function POST(request) {
  const connection = await db.getConnection();
  try {
    // 클라이언트로부터 form-data 또는 JSON 데이터를 파싱합니다.
    // 여기서는 form-data인 경우 예시입니다.
    const form = await request.formData();
    const siteId = form.get("siteId");
    const password = form.get("password");
    const adminName = form.get("adminName");
    const phoneNumber = form.get("phoneNumber");
    const email = form.get("email");
    const role = form.get("role");  // 예: '관리자', '최고관리자'
    const rank = form.get("rank");  // 예: '사원', '대표', '과장', '개발자'

    // 필수 입력값 검증
    if (!siteId || !password || !adminName || !phoneNumber || !email || !role || !rank) {
      return NextResponse.json({ message: '모든 필드를 입력해주세요.' }, { status: 400 });
    }

      
    // 이미 같은 site_id가 존재하는지 확인
    const [existing] = await connection.execute(
      'SELECT * FROM admin_info WHERE site_id = ?',
      [siteId]
    );
    if (existing.length > 0) {
      // await connection.end();
      return NextResponse.json({ message: '이미 존재하는 관리자 아이디입니다.' }, { status: 409 });
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    // admin_info 테이블에 새 관리자를 추가합니다.
    const [result] = await connection.execute(
      'INSERT INTO admin_info (site_id, password, admin_name, phone_number, email, role, `rank`) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [siteId, hashedPassword, adminName, phoneNumber, email, role, rank]
    );

    // await connection.end();

    return NextResponse.json({ message: '회원가입 성공', adminId: result.insertId });
  } catch (error) {
    console.error('회원가입 처리 중 오류:', error);
    return NextResponse.json({ message: '서버 오류' }, { status: 500 });
  } finally {
    connection.release(); // 반드시 연결 반환
  }
}
