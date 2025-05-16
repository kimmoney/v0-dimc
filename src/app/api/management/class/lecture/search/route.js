// /src/app/api/management/manager/search/route.js
import db from "@/api/db"
const data = [
  {id:1,class_number:'12123', competency_dimc:"D", difficulty:"기초",lecture_number:'1',lecture_time:'60',lecture_title:"기초수학",lecture_topic:"수학",lecture_description:"기초수학",prerequisite:"없음",syllabus:"없음"},
  {id:2,class_number:'12124', competency_dimc:"I", difficulty:"공통",lecture_number:'2',lecture_time:'60',lecture_title:"기초과학",lecture_topic:"과학",lecture_description:"기초과학",prerequisite:"없음",syllabus:"없음"},
  {id:3,class_number:'12125', competency_dimc:"M", difficulty:"중급",lecture_number:'3',lecture_time:'60',lecture_title:"기초영어",lecture_topic:"영어",lecture_description:"기초영어",prerequisite:"없음",syllabus:"없음"},
  {id:4,class_number:'12126', competency_dimc:"C", difficulty:"심화",lecture_number:'4',lecture_time:'60',lecture_title:"기초컴퓨터",lecture_topic:"컴퓨터",lecture_description:"기초컴퓨터",prerequisite:"없음",syllabus:"없음"},
  {id:5,class_number:'12127', competency_dimc:"D", difficulty:"기초",lecture_number:'5',lecture_time:'60',lecture_title:"기초수학",lecture_topic:"수학",lecture_description:"기초수학",prerequisite:"없음",syllabus:"없음"},
  {id:6,class_number:'12128', competency_dimc:"I", difficulty:"공통",lecture_number:'6',lecture_time:'60',lecture_title:"기초과학",lecture_topic:"과학",lecture_description:"기초과학",prerequisite:"없음",syllabus:"없음"},
  {id:7,class_number:'12129', competency_dimc:"M", difficulty:"중급",lecture_number:'7',lecture_time:'60',lecture_title:"기초영어",lecture_topic:"영어",lecture_description:"기초영어",prerequisite:"없음",syllabus:"없음"},
  {id:8,class_number:'12130', competency_dimc:"C", difficulty:"심화",lecture_number:'8',lecture_time:'60',lecture_title:"기초컴퓨터",lecture_topic:"컴퓨터",lecture_description:"기초컴퓨터",prerequisite:"없음",syllabus:"없음"},
  {id:9,class_number:'12131', competency_dimc:"D", difficulty:"기초",lecture_number:'9',lecture_time:'60',lecture_title:"기초수학",lecture_topic:"수학",lecture_description:"기초수학",prerequisite:"없음",syllabus:"없음"},
  {id:10,class_number:'12132', competency_dimc:"I", difficulty:"공통",lecture_number:'10',lecture_time:'60',lecture_title:"기초과학",lecture_topic:"과학",lecture_description:"기초과학",prerequisite:"없음",syllabus:"없음"},
  {id:11,class_number:'12133', competency_dimc:"M", difficulty:"중급",lecture_number:'11',lecture_time:'60',lecture_title:"기초영어",lecture_topic:"영어",lecture_description:"기초영어",prerequisite:"없음",syllabus:"없음"},
  {id:12,class_number:'12134', competency_dimc:"C", difficulty:"심화",lecture_number:'12',lecture_time:'60',lecture_title:"기초컴퓨터",lecture_topic:"컴퓨터",lecture_description:"기초컴퓨터",prerequisite:"없음",syllabus:"없음"},
  {id:13,class_number:'12135', competency_dimc:"D", difficulty:"기초",lecture_number:'13',lecture_time:'60',lecture_title:"기초수학",lecture_topic:"수학",lecture_description:"기초수학",prerequisite:"없음",syllabus:"없음"},
  {id:14,class_number:'12136', competency_dimc:"I", difficulty:"공통",lecture_number:'14',lecture_time:'60',lecture_title:"기초과학",lecture_topic:"과학",lecture_description:"기초과학",prerequisite:"없음",syllabus:"없음"},
  {id:15,class_number:'12137', competency_dimc:"M", difficulty:"중급",lecture_number:'15',lecture_time:'60',lecture_title:"기초영어",lecture_topic:"영어",lecture_description:"기초영어",prerequisite:"없음",syllabus:"없음"},
  {id:16,class_number:'12138', competency_dimc:"C", difficulty:"심화",lecture_number:'16',lecture_time:'60',lecture_title:"기초컴퓨터",lecture_topic:"컴퓨터",lecture_description:"기초컴퓨터",prerequisite:"없음",syllabus:"없음"},
  {id:17,class_number:'12139', competency_dimc:"D", difficulty:"기초",lecture_number:'17',lecture_time:'60',lecture_title:"기초수학",lecture_topic:"수학",lecture_description:"기초수학",prerequisite:"없음",syllabus:"없음"},
  {id:18,class_number:'12140', competency_dimc:"I", difficulty:"공통",lecture_number:'18',lecture_time:'60',lecture_title:"기초과학",lecture_topic:"과학",lecture_description:"기초과학",prerequisite:"없음",syllabus:"없음"},
  {id:19,class_number:'12141', competency_dimc:"M", difficulty:"중급",lecture_number:'19',lecture_time:'60',lecture_title:"기초영어",lecture_topic:"영어",lecture_description:"기초영어",prerequisite:"없음",syllabus:"없음"},
  {id:20,class_number:'12142', competency_dimc:"C", difficulty:"심화",lecture_number:'20',lecture_time:'60',lecture_title:"기초컴퓨터",lecture_topic:"컴퓨터",lecture_description:"기초컴퓨터",prerequisite:"없음",syllabus:"없음"},
  {id:21,class_number:'12143', competency_dimc:"D", difficulty:"기초",lecture_number:'21',lecture_time:'60',lecture_title:"기초수학",lecture_topic:"수학",lecture_description:"기초수학",prerequisite:"없음",syllabus:"없음"},
  {id:22,class_number:'12144', competency_dimc:"I", difficulty:"공통",lecture_number:'22',lecture_time:'60',lecture_title:"기초과학",lecture_topic:"과학",lecture_description:"기초과학",prerequisite:"없음",syllabus:"없음"},
  {id:23,class_number:'12145', competency_dimc:"M", difficulty:"중급",lecture_number:'23',lecture_time:'60',lecture_title:"기초영어",lecture_topic:"영어",lecture_description:"기초영어",prerequisite:"없음",syllabus:"없음"},
  {id:24,class_number:'12146', competency_dimc:"C", difficulty:"심화",lecture_number:'24',lecture_time:'60',lecture_title:"기초컴퓨터",lecture_topic:"컴퓨터",lecture_description:"기초컴퓨터",prerequisite:"없음",syllabus:"없음"},
  {id:25,class_number:'12147', competency_dimc:"D", difficulty:"기초",lecture_number:'25',lecture_time:'60',lecture_title:"기초수학",lecture_topic:"수학",lecture_description:"기초수학",prerequisite:"없음",syllabus:"없음"},
  {id:26,class_number:'12148', competency_dimc:"I", difficulty:"공통",lecture_number:'26',lecture_time:'60',lecture_title:"기초과학",lecture_topic:"과학",lecture_description:"기초과학",prerequisite:"없음",syllabus:"없음"},
  {id:27,class_number:'12149', competency_dimc:"M", difficulty:"중급",lecture_number:'27',lecture_time:'60',lecture_title:"기초영어",lecture_topic:"영어",lecture_description:"기초영어",prerequisite:"없음",syllabus:"없음"},
  {id:28,class_number:'12150', competency_dimc:"C", difficulty:"심화",lecture_number:'28',lecture_time:'60',lecture_title:"기초컴퓨터",lecture_topic:"컴퓨터",lecture_description:"기초컴퓨터",prerequisite:"없음",syllabus:"없음"},
  {id:29,class_number:'12151', competency_dimc:"D", difficulty:"기초",lecture_number:'29',lecture_time:'60',lecture_title:"기초수학",lecture_topic:"수학",lecture_description:"기초수학",prerequisite:"없음",syllabus:"없음"},
  {id:30,class_number:'12152', competency_dimc:"I", difficulty:"공통",lecture_number:'30',lecture_time:'60',lecture_title:"기초과학",lecture_topic:"과학",lecture_description:"기초과학",prerequisite:"없음",syllabus:"없음"},
  {id:31,class_number:'12153', competency_dimc:"D", difficulty:"기초", lecture_number:'31', lecture_time:'60', lecture_title:"기초수학", lecture_topic:"수학", lecture_description:"기초수학", prerequisite:"없음", syllabus:"없음"},
  {id:32,class_number:'12154', competency_dimc:"I", difficulty:"공통", lecture_number:'32', lecture_time:'60', lecture_title:"기초과학", lecture_topic:"과학", lecture_description:"기초과학", prerequisite:"없음", syllabus:"없음"},
  {id:33,class_number:'12155', competency_dimc:"M", difficulty:"중급", lecture_number:'33', lecture_time:'60', lecture_title:"기초영어", lecture_topic:"영어", lecture_description:"기초영어", prerequisite:"없음", syllabus:"없음"},
  {id:34,class_number:'12156', competency_dimc:"C", difficulty:"심화", lecture_number:'34', lecture_time:'60', lecture_title:"기초컴퓨터", lecture_topic:"컴퓨터", lecture_description:"기초컴퓨터", prerequisite:"없음", syllabus:"없음"},
  {id:35,class_number:'12157', competency_dimc:"D", difficulty:"기초", lecture_number:'35', lecture_time:'60', lecture_title:"기초수학", lecture_topic:"수학", lecture_description:"기초수학", prerequisite:"없음", syllabus:"없음"},
  {id:36,class_number:'12158', competency_dimc:"I", difficulty:"공통", lecture_number:'36', lecture_time:'60', lecture_title:"기초과학", lecture_topic:"과학", lecture_description:"기초과학", prerequisite:"없음", syllabus:"없음"},
  {id:37,class_number:'12159', competency_dimc:"M", difficulty:"중급", lecture_number:'37', lecture_time:'60', lecture_title:"기초영어", lecture_topic:"영어", lecture_description:"기초영어", prerequisite:"없음", syllabus:"없음"},
  {id:38,class_number:'12160', competency_dimc:"C", difficulty:"심화", lecture_number:'38', lecture_time:'60', lecture_title:"기초컴퓨터", lecture_topic:"컴퓨터", lecture_description:"기초컴퓨터", prerequisite:"없음", syllabus:"없음"},
  {id:39,class_number:'12161', competency_dimc:"D", difficulty:"기초", lecture_number:'39', lecture_time:'60', lecture_title:"기초수학", lecture_topic:"수학", lecture_description:"기초수학", prerequisite:"없음", syllabus:"없음"},
  {id:40,class_number:'12162', competency_dimc:"I", difficulty:"공통", lecture_number:'40', lecture_time:'60', lecture_title:"기초과학", lecture_topic:"과학", lecture_description:"기초과학", prerequisite:"없음", syllabus:"없음"},
  {id:41,class_number:'12163', competency_dimc:"M", difficulty:"중급", lecture_number:'41', lecture_time:'60', lecture_title:"기초영어", lecture_topic:"영어", lecture_description:"기초영어", prerequisite:"없음", syllabus:"없음"},
  {id:42,class_number:'12164', competency_dimc:"C", difficulty:"심화", lecture_number:'42', lecture_time:'60', lecture_title:"기초컴퓨터", lecture_topic:"컴퓨터", lecture_description:"기초컴퓨터", prerequisite:"없음", syllabus:"없음"},
  {id:43,class_number:'12165', competency_dimc:"D", difficulty:"기초", lecture_number:'43', lecture_time:'60', lecture_title:"기초수학", lecture_topic:"수학", lecture_description:"기초수학", prerequisite:"없음", syllabus:"없음"},
  {id:44,class_number:'12166', competency_dimc:"I", difficulty:"공통", lecture_number:'44', lecture_time:'60', lecture_title:"기초과학", lecture_topic:"과학", lecture_description:"기초과학", prerequisite:"없음", syllabus:"없음"},
  {id:45,class_number:'12167', competency_dimc:"M", difficulty:"중급", lecture_number:'45', lecture_time:'60', lecture_title:"기초영어", lecture_topic:"영어", lecture_description:"기초영어", prerequisite:"없음", syllabus:"없음"},
  {id:46,class_number:'12168', competency_dimc:"C", difficulty:"심화", lecture_number:'46', lecture_time:'60', lecture_title:"기초컴퓨터", lecture_topic:"컴퓨터", lecture_description:"기초컴퓨터", prerequisite:"없음", syllabus:"없음"},
  {id:47,class_number:'12169', competency_dimc:"D", difficulty:"기초", lecture_number:'47', lecture_time:'60', lecture_title:"기초수학", lecture_topic:"수학", lecture_description:"기초수학", prerequisite:"없음", syllabus:"없음"},
  {id:48,class_number:'12170', competency_dimc:"I", difficulty:"공통", lecture_number:'48', lecture_time:'60', lecture_title:"기초과학", lecture_topic:"과학", lecture_description:"기초과학", prerequisite:"없음", syllabus:"없음"},
  {id:49,class_number:'12171', competency_dimc:"M", difficulty:"중급", lecture_number:'49', lecture_time:'60', lecture_title:"기초영어", lecture_topic:"영어", lecture_description:"기초영어", prerequisite:"없음", syllabus:"없음"},
  {id:50,class_number:'12172', competency_dimc:"C", difficulty:"심화", lecture_number:'50', lecture_time:'60', lecture_title:"기초컴퓨터", lecture_topic:"컴퓨터", lecture_description:"기초컴퓨터", prerequisite:"없음", syllabus:"없음"},
  {id:51,class_number:'12173', competency_dimc:"D", difficulty:"기초", lecture_number:'51', lecture_time:'60', lecture_title:"기초수학", lecture_topic:"수학", lecture_description:"기초수학", prerequisite:"없음", syllabus:"없음"},
  {id:52,class_number:'12174', competency_dimc:"I", difficulty:"공통", lecture_number:'52', lecture_time:'60', lecture_title:"기초과학", lecture_topic:"과학", lecture_description:"기초과학", prerequisite:"없음", syllabus:"없음"},
  {id:53,class_number:'12175', competency_dimc:"M", difficulty:"중급", lecture_number:'53', lecture_time:'60', lecture_title:"기초영어", lecture_topic:"영어", lecture_description:"기초영어", prerequisite:"없음", syllabus:"없음"},
  {id:54,class_number:'12176', competency_dimc:"C", difficulty:"심화", lecture_number:'54', lecture_time:'60', lecture_title:"기초컴퓨터", lecture_topic:"컴퓨터", lecture_description:"기초컴퓨터", prerequisite:"없음", syllabus:"없음"},
  {id:55,class_number:'12177', competency_dimc:"D", difficulty:"기초", lecture_number:'55', lecture_time:'60', lecture_title:"기초수학", lecture_topic:"수학", lecture_description:"기초수학", prerequisite:"없음", syllabus:"없음"},
  {id:56,class_number:'12178', competency_dimc:"I", difficulty:"공통", lecture_number:'56', lecture_time:'60', lecture_title:"기초과학", lecture_topic:"과학", lecture_description:"기초과학", prerequisite:"없음", syllabus:"없음"},
  {id:57,class_number:'12179', competency_dimc:"M", difficulty:"중급", lecture_number:'57', lecture_time:'60', lecture_title:"기초영어", lecture_topic:"영어", lecture_description:"기초영어", prerequisite:"없음", syllabus:"없음"},
  {id:58,class_number:'12180', competency_dimc:"C", difficulty:"심화", lecture_number:'58', lecture_time:'60', lecture_title:"기초컴퓨터", lecture_topic:"컴퓨터", lecture_description:"기초컴퓨터", prerequisite:"없음", syllabus:"없음"},
  {id:59,class_number:'12181', competency_dimc:"D", difficulty:"기초", lecture_number:'59', lecture_time:'60', lecture_title:"기초수학", lecture_topic:"수학", lecture_description:"기초수학", prerequisite:"없음", syllabus:"없음"},
  {id:60,class_number:'12182', competency_dimc:"I", difficulty:"공통", lecture_number:'60', lecture_time:'60', lecture_title:"기초과학", lecture_topic:"과학", lecture_description:"기초과학", prerequisite:"없음", syllabus:"없음"}
]
export async function GET(request) {
  // 1. 요청 URL에서 쿼리 파라미터 추출
  const { searchParams } = new URL(request.url);
  const class_number = searchParams.get('class_number') || '';
  const competency_dimc = searchParams.get('competency_dimc') || '';
  const difficulty = searchParams.get('difficulty') || '';
  const lecture_number  = searchParams.get('lecture_number') || '';
  const lecture_time = searchParams.get('lecture_time') || '';
  const lecture_title = searchParams.get('lecture_title') || '';
  const lecture_topic = searchParams.get('lecture_topic') || '';
  const lecture_description = searchParams.get('lecture_description') || '';
  const prerequisite = searchParams.get('prerequisite') || '';
  const syllabus = searchParams.get('syllabus') || '';
  const page = searchParams.get('page') || '1';
  // const page = '1'
  const limit = 10;
  const pageInt = parseInt(page, 10);
  const limitInt = parseInt(limit, 10);
  const offset = (pageInt - 1) * limitInt;
  // console.log({class_number, competency_dimc, difficulty, lecture_number, lecture_time, lecture_title, lecture_topic, lecture_description, prerequisite, syllabus})
  const filteredData = data.filter((item) => {
    return (
      item.class_number.includes(class_number) &&
      item.competency_dimc.includes(competency_dimc) &&
      item.difficulty.includes(difficulty) &&
      item.lecture_number.includes(lecture_number) &&
      item.lecture_time.includes(lecture_time) &&
      item.lecture_title.includes(lecture_title) &&
      item.lecture_topic.includes(lecture_topic) &&
      item.lecture_description.includes(lecture_description) &&
      item.prerequisite.includes(prerequisite) &&
      item.syllabus.includes(syllabus)
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

