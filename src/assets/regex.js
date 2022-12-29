// 패턴 정규표현식
//숫자 정규식
const numberRegex = /^[0-9]+$/;
//이메일 정규식표현식
//eslint-disable-next-line
const emailRegex =/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

//비밀번호 정규식
const pwRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
//소수점 정규표현식(x.x.xxxx)
//eslint-disable-next-line
const verRegex = /^([0-9]{1})*\.([0-9]{1})*\.([0-9]{4})$/;


//이름 정규식
const lanRegex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|\s]+$/;
const lanRegexWithNum = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/;
const companyRegex = /[a-zA-Z0-9가-힇ㄱ-ㅎㅏ-ㅣぁ-ゔァ-ヴー々〆〤一-龥]/;

//custom
const keyRegex = /^[a-z|A-Z|0-9]+$/;
const valueRegex = /^[0-9\\.]+$/;
const codeRegex = /^[a-z|A-Z|0-9]+$/;
//ㅎ
export {
  numberRegex,
  emailRegex,
  verRegex,
  lanRegex,
  lanRegexWithNum,
  pwRegex,
  companyRegex,
  keyRegex,
  valueRegex,
  codeRegex,
};
