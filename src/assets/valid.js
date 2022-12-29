import { _ } from "core-js";
import {
  lanRegex,
  pwRegex,
  companyRegex,
  emailRegex,
  numberRegex,
  keyRegex,
  valueRegex,
  codeRegex,
} from "./regex";
const empty = (v) => !!v || "값이 비었습니다";
const name = (v) => {
  if (v.length === 0) {
    return true;
  } else {
    return !!lanRegex.test(v) || "이름은 한글과 영문만 가능합니다";
  }
};
const password = (v) =>
  !!pwRegex.test(v) ||
  "영문 대/소문자 , 숫자 , 특수문자를 포함한 8자리 이상이 필요합니다";
const company = (v) => {
  if (v.length === 0) {
    return true;
  } else {
    !!companyRegex.test(v) || "올바른 기업명을 입력해주세요";
  }
};
const email = (v) => !!emailRegex.test(v) || "이메일 형식에 맞지 않습니다";
const number = (v) => !!numberRegex.test(v) || "숫자만 입력해야합니다";
const check = (v) => !!v || "약관에 동의하셔야 합니다";
const passwordCode = (v, c) => {
  return !!(v == c) || "비밀번호는 서로 같아야 합니다";
};
const sample = (v, max, type) => {
  if (v.length === 0) {
    return true;
  }
  const count = _.reduce(
    v,
    (a, v) => {
      if (v === "/") a++;
      return a;
    },
    0
  );
  if (count > max) {
    return `구분자는 ${max}개까지 가능합니다`;
  } else {
    v = v.replaceAll("/", "");
    switch (type) {
      case "key":
        return (
          !!keyRegex.test(v) ||
          "띄어쓰기 없이 영문, 숫자. 구분값만 입력 가능합니다"
        );
      case "value":
        return (
          !!valueRegex.test(v) || "띄어쓰기 없이 숫자. 구분값만 입력 가능합니다"
        );
    }
  }
};
const commonCode = (v) => {
  if (v.length === 0) {
    return true;
  } else {
    !!codeRegex.test(v) || "숫자와 영어만 입력가능합니다";
  }
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
  sample,
  commonCode,
};
export default validSet;
