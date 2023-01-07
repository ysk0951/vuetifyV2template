import { ValueType } from "realgrid";
import store from "@/store/index";
export const fields = [
  {
    fieldName: "roles",
  },
  {
    fieldName: "member_name",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "email",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "company",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "phone",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "employee_code",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "work",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "memo",
    dataType: ValueType.TEXT,
  },
  {
    fieldName: "save",
    dataType: ValueType.TEXT,
  },
];

export const columns = [
  {
    name: "roles",
    fieldName: "roles",
    sortable: false,
    lookupDisplay: true,
    values: store.state.select.roleType,
    labels: store.state.select.roleType,
    editor: {
      type: "dropdown",
      textReadOnly: true,
    },
    header: {
      text: "계정구분",
      styleName: "orange-column",
    },
    editButtonVisibility: "always",
  },
  {
    name: "member_name",
    fieldName: "member_name",
    type: "data",
    styles: {
      textAlignment: "center",
    },
    header: "이름",
    editable: true,
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
    editable: false,
  },
  {
    name: "company",
    fieldName: "company",
    type: "data",
    styles: {
      textAlignment: "center",
    },
    header: {
      text: "기업명",
      showTooltip: false,
    },
    editable: true,
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
    editable: true,
  },
  {
    name: "employee_code",
    fieldName: "employee_code",
    type: "data",
    styles: {
      textAlignment: "center",
    },
    header: {
      text: "사번",
      showTooltip: false,
    },
    editable: true,
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
    editable: true,
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
    editable: true,
  },
  {
    name: "save",
    fieldName: "save",
    type: "data",
    styles: {
      textAlignment: "center",
    },
    header: {
      text: "저장",
    },
    editable: false,
    renderer: {
      type: "button",
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
    memo: "17",
  },
];
