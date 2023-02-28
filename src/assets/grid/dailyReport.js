import _ from "lodash";
import { makeCell } from "./gridUtill";
let fields = [];
let columns = [];
const data = [
  {
    field: "lotNo",
    alias: "Lot No",
  },
  {
    field: "salestype",
    alias: "영업분류",
  },
  {
    field: "request_date",
    alias: "요청일",
  },
  {
    field: "produce_due_date",
    alias: "제조예정일",
  },
  {
    field: "produce_date",
    alias: "제조진행사항",
  },
  {
    field: "out_date",
    alias: "출하진행사항",
  },
  {
    field: "out_due_date",
    alias: "출하예정일",
  },
  {
    field: "derivery_due_date",
    alias: "납기 예정일",
  },
  {
    field: "derivery_date",
    alias: "납기일",
  },
  {
    field: "code",
    alias: "제품 Code Grade",
  },
  {
    field: "request_company",
    alias: "요청 업체명",
  },
  {
    field: "request_name",
    alias: "요청자",
  },
  {
    field: "pick_name_chg",
    alias: "수령자 변경여부",
  },
  {
    field: "pickpart",
    alias: "수령처",
  },
  {
    field: "pick_name",
    alias: "수령자",
  },
  {
    field: "price_type",
    alias: "유,무상",
  },
  {
    field: "qty",
    alias: "Qty(kg)",
  },
  {
    field: "packing",
    alias: "용기 구분",
  },
  {
    field: "delivery_type",
    alias: "배송방법",
  },
  {
    field: "request_code",
    alias: "고객요청자재코드",
  },
  {
    field: "resultYn",
    alias: "결과입력",
  },
];

_.each(data, function (o) {
  o.indexExclusive = true;
  makeCell(1, [o], fields, columns);
});
export { fields, columns };
