import { _ } from "core-js";
import {
  nameRule,
  pwRegex,
  companyRegex,
  emailRegex,
  numberRegex,
  keyRegex,
  valueRegex,
  codeRegex,
  employRegex,
} from "./regex";
const empty = (v, message) => {
  return !!v || message;
};
const name = (v) => {
  if (v.length === 0) {
    return true;
  } else {
    return !!nameRule.test(v) || "이름은 한글과 영문만 가능합니다";
  }
};
const password = (v) =>
  !!pwRegex.test(v) ||
  "영문 대/소문자 , 숫자 , 특수문자를 포함 8자리 이상 필요";
const company = (v) => {
  if (v) {
    v = v.replaceAll("(", "").replaceAll(")", "");
    if (v.length === 0) {
      return true;
    } else {
      return !!companyRegex.test(v) || "특수문자는 괄호만 입력 가능합니다";
    }
  } else {
    return true;
  }
};
const email = (v) => {
  if (v.length === 0) {
    return true;
  }
  return !!emailRegex.test(v) || "이메일 형식에 맞지 않습니다";
};
const number = (v) => {
  if (v.length === 0) {
    return true;
  }
  return !!numberRegex.test(v) || "숫자만 입력해야합니다";
};
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
    return !!codeRegex.test(v) || "숫자와 영어만 입력가능합니다";
  }
};
const commonCodeHipen = (v) => {
  v = v.replaceAll("-", "");
  if (v.length === 0) {
    return true;
  } else {
    return !!codeRegex.test(v) || "숫자, 영어, 하이픈만 입력가능합니다";
  }
};
const employNumber = (v) => {
  if (!v || v.length === 0) {
    return true;
  }
  return !!employRegex.test(v) || "사번은 숫자와 영문만 입력 가능합니다";
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
  commonCodeHipen,
  employNumber,
};
export default validSet;
