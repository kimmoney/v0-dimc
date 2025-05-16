// /src/app/api/management/user/detail/route.js
import db from "@/api/db"
import { userInfo } from 'os';
import { use } from "react";
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const user_id = searchParams.get('user_id') || '';
  // 1. 요청 URL에서 쿼리 파라미터 추출
  // if (status) {
  //   conditions += ' AND status = ?';
  //   queryParams.push(status);
  // }
  console.log(searchParams)
  const connection = await db.getConnection();
  try {
    // 4. MySQL 연결 획득
    const rowQuery = `SELECT ui.*, pi.*, dt.*,ci.*
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
          ) dt ON ui.user_id = dt.user_id where ui.user_id = ?`
    // const [rows] = await connection.execute(rowQuery, user_id);
    const [rows] = await connection.execute(rowQuery, [user_id]); 
    // console.log(rows)
    // 연결 종료
    let user_info = rows[0];
    console.log(user_info);
    if (userInfo.registration_date){
      const registrationDate = new Date(user_info.registration_date);
      registrationDate.setMonth(registrationDate.getMonth() + user_info.range_type);
      user_info.end_date = registrationDate.toISOString().split('T')[0];
      user_info.registration_date = user_info.registration_date.toISOString().split('T')[0];
      user_info.birthdate = user_info.birthdate.toISOString().split('T')[0];
}

    const paymentQuery = `SELECT * FROM cource_info WHERE user_id = ? order by registration_date desc`
    const [payment] = await connection.execute(paymentQuery, [user_id]);
    user_info.paymentHistory = payment;
    user_info.paymentHistory.forEach((payment) => {
      const paymentDate = new Date(payment.registration_date);
      payment.registration_date = paymentDate.toISOString().split('T')[0];
      paymentDate.setMonth(paymentDate.getMonth() + payment.range_type);
      payment.end_date = paymentDate.toISOString().split('T')[0];
    });
    
    const dimcTestQuery = `SELECT * FROM dimc_result WHERE user_id = ?`
    const [dimcTest] = await connection.execute(dimcTestQuery, [user_id]);
    user_info.dimcTest = dimcTest;
    user_info.dimcTest.forEach((test) => {
      test.testdate = test.testdate.toISOString().split('T')[0] + '   ' + test.testdate.toTimeString().split(' ')[0];
    });
    user_info.birthdate = user_info.birthdate.toISOString().split('T')[0];
    user_info.testdate = user_info.testdate.toISOString().split('T')[0] + '   ' + user_info.testdate.toTimeString().split(' ')[0];
    user_info.registration_date = user_info.registration_date.toISOString().split('T')[0];
    // await connection.end();
    // console.log(rows);
    // 7. 결과 반환

    
    console.log(user_info);
    return new Response(
      JSON.stringify(user_info),
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
