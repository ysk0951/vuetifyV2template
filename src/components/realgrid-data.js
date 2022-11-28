import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "no",
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: "type",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "name",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "email",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "coName",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "phone",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "coNumber",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "work",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "etc",
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    name: "no",
    fieldName: "no",
    type: "data",
    styles: {
      textAlignment: "center",
    },
    header: {
      text: "번호",
      showTooltip: true,
      tooltip: '<span style="color: red;">번호</span>',
    },
    renderer: {
      type: "text",
      showTooltip: true,
    },
  },
  {
    name: "type",
    fieldName: "type",
    type: "data",
    styles: {
      textAlignment: "center",
    },
    header: {
      text: "계정 구분",
      showTooltip: false,
    },
  },
  {
    name: "name",
    fieldName: "name",
    type: "data",
    styles: {
      textAlignment: "center",
    },
    header: "이름",
  },
  {
    name: "email",
    fieldName: "email",
    type: "data",
    styles: {
      textAlignment: "center",
    },
    header: {
      text: "이메일",
      showTooltip: false,
    },
  },
  {
    name: "coName",
    fieldName: "coName",
    type: "data",
    styles: {
      textAlignment: "center",
    },
    header: {
      text: "기업명",
      showTooltip: false,
    },
  },
  {
    name: "phone",
    fieldName: "phone",
    type: "data",
    styles: {
      textAlignment: "center",
    },
    header: {
      text: "휴대폰 번호",
      showTooltip: false,
    },
  },
  {
    name: "coNumber",
    fieldName: "coNumber",
    type: "data",
    styles: {
      textAlignment: "center",
    },
    header: {
      text: "사번",
      showTooltip: false,
    },
  },
  {
    name: "work",
    fieldName: "work",
    type: "data",
    styles: {
      textAlignment: "center",
    },
    header: {
      text: "재직",
      showTooltip: false,
    },
  },
  {
    name: "etc",
    fieldName: "etc",
    type: "data",
    styles: {
      textAlignment: "center",
    },
    header: {
      text: "비고",
      showTooltip: false,
    },
  },
];

export const rows = [
  {
    no: 1,
    name: "Kessie",
    type: "123",
    email: "Vijendra N. Raj",
    coNumber: "mus.Donec.dignissim@Praesent.edu",
    coName: "123",
    phone: "123",
    work: "Arcu Et Pede Incorporated",
    etc: "17",
  },
];
