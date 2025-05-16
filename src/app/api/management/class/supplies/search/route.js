// /src/app/api/management/manager/search/route.js
import db from "@/api/db"
import { it } from "node:test";
const data = [
    {id: 1, item_name: "화이트보드", description: "수업 중 필기나 스케치에 사용할 수 있는 소형 화이트보드",quantity:30},
    {id: 2, item_name: "마커펜 세트", description: "화이트보드에서 사용 가능한 다양한 색상의 마커펜",quantity:30},
    {id: 3, item_name: "지우개", description: "화이트보드의 필기를 지울 수 있는 지우개",quantity:30},
    {id: 4, item_name: "칠판 자석", description: "화이트보드나 철제 칠판에 부착 가능한 자석",quantity:30},
    {id: 5, item_name: "노트북 거치대", description: "온라인 강의나 수업 중 노트북을 올려둘 수 있는 거치대",quantity:30},
    {id: 6, item_name: "A4 노트", description: "수업 필기 및 정리를 위한 A4 크기의 노트",quantity:30},
    {id: 7, item_name: "스티커 메모", description: "중요한 내용을 메모하고 붙여둘 수 있는 점착 메모지",quantity:30},
    {id: 8, item_name: "모눈 공책", description: "수학, 과학 등의 그래프 작업을 위한 모눈 공책",quantity:30},
    {id: 9, item_name: "연필 세트", description: "필기를 위한 HB 연필 세트",quantity:30},
    {id: 10, item_name: "지우개", description: "연필 필기를 지울 수 있는 소프트 지우개",quantity:30},
    {id: 11, item_name: "샤프", description: "편리한 필기를 위한 샤프펜슬",quantity:30},
    {id: 12, item_name: "샤프심", description: "샤프펜슬에 사용 가능한 0.5mm 샤프심",quantity:30},
    {id: 13, item_name: "자", description: "정확한 선을 긋거나 길이를 측정할 수 있는 30cm 자",quantity:30},
    {id: 14, item_name: "각도기", description: "각도를 측정하는 데 사용되는 180도 각도기",quantity:30},
    {id: 15, item_name: "컴퍼스", description: "원이나 호를 그리는 데 사용되는 컴퍼스",quantity:30},
    {id: 16, item_name: "하드커버 노트", description: "오래 보관할 수 있는 하드커버 노트",quantity:30},
    {id: 17, item_name: "포스트잇", description: "강조할 내용을 표시하는 데 유용한 점착 메모지",quantity:30},
    {id: 18, item_name: "수정테이프", description: "잘못 쓴 내용을 깔끔하게 수정할 수 있는 테이프형 수정액",quantity:30},
    {id: 19, item_name: "형광펜 세트", description: "중요한 부분을 강조하는 데 사용할 수 있는 다양한 색상의 형광펜",quantity:30},
    {id: 20, item_name: "칼라 색연필", description: "그림이나 도표를 칠할 수 있는 색연필 세트",quantity:30},
    {id: 21, item_name: "크레파스", description: "유아 및 초등 교육용 크레파스",quantity:30},
    {id: 22, item_name: "물감 세트", description: "미술 수업에 필요한 다양한 색상의 물감",quantity:30},
    {id: 23, item_name: "붓 세트", description: "물감 작업을 위한 다양한 크기의 붓",quantity:30},
    {id: 24, item_name: "색종이", description: "공작 수업에 필요한 다양한 색상의 색종이",quantity:30},
    {id: 25, item_name: "가위", description: "종이 및 공작물 제작에 필요한 가위",quantity:30},
    {id: 26, item_name: "딱풀", description: "종이 공작 및 스크랩북 작업에 사용되는 딱풀",quantity:30},
    {id: 27, item_name: "양면테이프", description: "다양한 제작물에 활용할 수 있는 양면테이프",quantity:30},
    {id: 28, item_name: "클립 세트", description: "서류나 종이를 정리하는 데 사용하는 클립",quantity:30},
    {id: 29, item_name: "스테이플러", description: "여러 장의 종이를 고정할 수 있는 스테이플러",quantity:30},
    {id: 30, item_name: "스테이플러 심", description: "스테이플러에 사용되는 리필 심",quantity:30},
    {id: 31, item_name: "화이트보드 크리너", description: "화이트보드 마커 흔적을 깨끗이 지울 수 있는 크리너",quantity:30},
    {id: 32, item_name: "도화지", description: "미술 및 디자인 작업에 사용하는 도화지",quantity:30},
    {id: 33, item_name: "책받침", description: "필기 시 종이를 보호하는 데 사용하는 책받침",quantity:30},
    {id: 34, item_name: "파일 바인더", description: "문서를 정리하고 보관할 수 있는 바인더",quantity:30},
    {id: 35, item_name: "클리어 파일", description: "서류 및 자료를 보호하고 정리할 수 있는 투명 파일",quantity:30},
    {id: 36, item_name: "메모지", description: "빠른 메모를 위한 작은 크기의 노트",quantity:30},
    {id: 37, item_name: "문구 세트", description: "다양한 필기구와 문구용품이 포함된 세트",quantity:30},
    {id: 38, item_name: "수학 세트", description: "자, 각도기, 컴퍼스 등이 포함된 수학 필기구 세트",quantity:30},
    {id: 39, item_name: "초등 학습 카드", description: "기초 학습을 돕는 알파벳 및 숫자 학습 카드",quantity:30},
    {id: 40, item_name: "도장 세트", description: "유아 및 초등 교육에 활용할 수 있는 칭찬 도장 세트",quantity:30}
];

export async function GET(request) {
  // 1. 요청 URL에서 쿼리 파라미터 추출
  const { searchParams } = new URL(request.url);
  console.log(searchParams)
  // const class_number = searchParams.get('class_number') || '';
  // const competency_dimc = searchParams.get('competency_dimc') || '';
  // const difficulty = searchParams.get('difficulty') || '';
  // const lecture_number  = searchParams.get('lecture_number') || '';
  // const lecture_time = searchParams.get('lecture_time') || '';
  // const lecture_title = searchParams.get('lecture_title') || '';
  // const lecture_topic = searchParams.get('lecture_topic') || '';
  // const lecture_description = searchParams.get('lecture_description') || '';
  // const prerequisite = searchParams.get('prerequisite') || '';
  // const syllabus = searchParams.get('syllabus') || '';
  const page = searchParams.get('page') || '1';
  const id = searchParams.get('id') || '';
  const item_name = searchParams.get('item_name') || '';
  const description = searchParams.get('description')|| '';
  console.log({id, item_name, description})

  // const page = '1'
  const limit = 10;
  const pageInt = parseInt(page, 10);
  const limitInt = parseInt(limit, 10);
  const offset = (pageInt - 1) * limitInt;
  // console.log({class_number, competency_dimc, difficulty, lecture_number, lecture_time, lecture_title, lecture_topic, lecture_description, prerequisite, syllabus})
  const filteredData = data.filter((item) => {
    return (
      item.id.toString().includes(id) &&
      item.item_name.includes(item_name) &&
      item.description.includes(description)
      // item.class_number.includes(class_number) &&
      // item.competency_dimc.includes(competency_dimc) &&
      // item.difficulty.includes(difficulty) &&
      // item.lecture_number.includes(lecture_number) &&
      // item.lecture_time.includes(lecture_time) &&
      // item.lecture_title.includes(lecture_title) &&
      // item.lecture_topic.includes(lecture_topic) &&
      // item.lecture_description.includes(lecture_description) &&
      // item.prerequisite.includes(prerequisite) &&
      // item.syllabus.includes(syllabus)
    );
  });
  // console.log(filteredData)
  // const min_age = searchParams.get('min_age') || '';
  // const max_age = searchParams.get('max_age') || '';
  // let course_type = searchParams.get('course_type') || '';
  // let gender = searchParams.get('gender') || '';
  // let status = searchParams.get('status') || '';
  // let dimc = searchParams.get('dimc') || '';
  // dimc = JSON.parse(dimc)
  // status = status.trim();
  // gender = gender.trim();
  // course_type = course_type.trim();
  
  const totalCount = filteredData.length;
  // console.log(totalCount)
  const totalPages = Math.ceil(totalCount / limitInt);

  const pagenationData = filteredData.slice(offset, offset + limitInt);
  console.log(pagenationData)
  return new Response(
    JSON.stringify({
      lectures: pagenationData,
      totalPages,
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );




  
}

