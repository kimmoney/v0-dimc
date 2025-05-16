// src/app/api/management-login/signup/route.js
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import db from "@/api/db"

export async function POST(request) {
  const connection = await db.getConnection();
  try {
    // request.formData()는 Promise를 반환하므로 await로 결과를 가져옵니다.
    const form = await request.formData();
    
    // form 데이터 추출
    const siteId = form.get("siteId");
    const password = form.get("password");
    const adminName = form.get("adminName");
    const phoneNumber = form.get("phoneNumber");
    const email = form.get("email");
    const role = form.get("role");   // 예: '관리자', '최고관리자'
    const rank = form.get("rank");   // 예: '사원', '대표', '과장', '개발자'
    const status = form.get("status"); // 추가 필드 (예: 활성/비활성 상태)
    console.log('status:', status);
    console.log('rank:', rank);
    console.log('role:', role);
    console.log('email:', email);
    console.log('phoneNumber:', phoneNumber);
    console.log('adminName:', adminName);
    // 필수 입력값 검증
    if (!siteId || !adminName || !phoneNumber || !email || !role || !rank || !status) {
      return NextResponse.json(
        { message: '모든 필드를 입력해주세요.' },
        { status: 400 }
      );
    }


    // 비밀번호가 없으면 비밀번호 업데이트 없이 기타 정보만 수정
    if (!password) {
      const [result] = await connection.execute(
        'UPDATE admin_info SET admin_name = ?, phone_number = ?, email = ?, role = ?, `rank` = ?, status = ? WHERE site_id = ?',
        [adminName, phoneNumber, email, role, rank, status, siteId]
      );
      // 작업 후 연결 종료
      // await connection.end();

      return NextResponse.json(
        { message: '회원 정보 수정 완료', adminId: result.insertId },
        { status: 200 }
      );
    } else {
      // 비밀번호가 있는 경우, 해싱 후 업데이트
      const hashedPassword = await bcrypt.hash(password, 10);
      const [result] = await connection.execute(
        'UPDATE admin_info SET password = ?, admin_name = ?, phone_number = ?, email = ?, role = ?, `rank` = ?, status = ? WHERE site_id = ?',
        [hashedPassword, adminName, phoneNumber, email, role, rank, status, siteId]
      );
      // await connection.end();

      return NextResponse.json(
        { message: '회원 정보 수정 완료', adminId: result.insertId },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error('회원 정보 수정 중 오류:', error);
    return NextResponse.json({ message: '서버 오류' }, { status: 500 });
  } finally {
    connection.release(); // 반드시 연결 반환
  }
}
