import {
  lanRegex,
  pwRegex,
  companyRegex,
  emailRegex,
  numberRegex,
} from "./regex";

const empty = (v) => !!v | "값이 비었습니다";
const name = (v) => !!lanRegex.test(v) || "이름은 한글과 영문만 가능합니다";
const password = (v) =>
  !!pwRegex.test(v) ||
  "영문 대/소문자 , 숫자 , 특수문자를 포함한 8자리 이상이 필요합니다";
const company = (v) => !!companyRegex.test(v) || "올바른 기업명을 입력해주세요";
const email = (v) => !!emailRegex.test(v) || "이메일 형식에 맞지 않습니다";
const number = (v) => !!numberRegex.test(v) || "숫자만 입력해야합니다";
const check = (v) => !!v || "약관에 동의하셔야 합니다";
const passwordCode = (v, c) => {
  console.log(v, c);
  return !!(v == c) || "비밀번호는 서로 같아야 합니다";
};
const validSet = {
  empty,
  name,
  password,
  company,
  email,
  number,
  check,
  passwordCode,
};
export default validSet;
