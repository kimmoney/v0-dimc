// src\app\api\management\login\login\localSaveUserInfo.js

export function localSaveUserInfo(props) {
    
const userInfo = localStorage.getItem("userInfo");
console.log(userInfo);
if (userInfo) {
  return JSON.parse(userInfo);
}
return null;
}