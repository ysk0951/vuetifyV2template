// 패턴 정규표현식
//전화번호 정규식표현식
//eslint-disable-next-line
const telRegex1 = /\d{3}-\d{4}-\d{4}/;
//(\d는 숫자를 의미하고, {} 숫자갯수를 의미합니다.)

//휴대폰 정규식표현식
//eslint-disable-next-line
const telRegex2 = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

//이메일 정규식표현식
//eslint-disable-next-line
const emailRegex =/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

//소수점 정규표현식(x.x.xxxx)
//eslint-disable-next-line
const verRegex = /^([0-9]{1})*\.([0-9]{1})*\.([0-9]{4})$/;

const lanRegex = /[^a-z|A-Z|0-9|ㄱ-ㅎ|가-힣]/g;
const lanRegexWithNum = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/;

export {
  telRegex1,
  telRegex2,
  emailRegex,
  verRegex,
  lanRegex,
  lanRegexWithNum,
};
