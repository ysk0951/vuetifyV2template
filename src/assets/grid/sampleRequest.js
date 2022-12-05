import { ValueType } from "realgrid";

export const fields = [
  {
    fieldName: "no",
    dataType: ValueType.INT,
  },
  {
    fieldName: "lotNO",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "codeGrade",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "requestDay",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "makeDay",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "releaseDay",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "address",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "memo",
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
      text: "",
      showTooltip: true,
      tooltip: '<span style="color: red;"></span>',
    },
    renderer: {
      type: "text",
      showTooltip: true,
    },
    editable: false,
  },
  {
    name: "lotNO",
    fieldName: "lotNO",
    type: "data",
    styles: {
      textAlignment: "center",
    },
    header: {
      text: "lotNO",
      showTooltip: false,
    },
    editable: false,
  },
  {
    name: "codeGrade",
    fieldName: "codeGrade",
    type: "data",
    styles: {
      textAlignment: "center",
    },
    header: "CodeGrade",
    editable: false,
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
    editable: false,
  },
  {
    name: "requestDay",
    fieldName: "requestDay",
    type: "data",
    styles: {
      textAlignment: "center",
    },
    header: {
      text: "요청일",
      showTooltip: false,
    },
    editable: false,
  },
  {
    name: "makeDay",
    fieldName: "makeDay",
    type: "data",
    styles: {
      textAlignment: "center",
    },
    header: {
      text: "제조 요청일",
      showTooltip: false,
    },
    editable: false,
  },
  {
    name: "releaseDay",
    fieldName: "releaseDay",
    type: "data",
    styles: {
      textAlignment: "center",
    },
    header: {
      text: "출하 요청일",
      showTooltip: false,
    },
    editable: false,
  },
  {
    name: "address",
    fieldName: "address",
    type: "data",
    styles: {
      textAlignment: "center",
    },
    header: {
      text: "배송지",
      showTooltip: false,
    },
    editable: false,
  },
  {
    name: "memo",
    fieldName: "memo",
    type: "data",
    styles: {
      textAlignment: "center",
    },
    header: {
      text: "비고",
      showTooltip: false,
    },
    editable: false,
  },
];

export const rows = [];
