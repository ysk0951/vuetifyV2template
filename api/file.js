import http from "./http";
import moment from "moment";
import * as XLSX from "xlsx";
const FileDownload = require("js-file-download");
export async function getSample() {
  return http
    .get("/DW_Sample_request.xlsx", { responseType: "blob" })
    .then((response) => {
      FileDownload(response.data, `sample_${moment.now()}.xlsx`);
    })
    .catch((exception) => {
      console.log(exception);
      alert("파일 다운로드 실패");
    });
}

export async function getExcel(data, name) {
  try {
    let binaryWS = XLSX.utils.json_to_sheet(data);
    var wb = XLSX.utils.book_new();
    const exel_name = `${name}_${moment.now()}`;
    XLSX.utils.book_append_sheet(wb, binaryWS, exel_name);
    XLSX.writeFile(wb, `${exel_name}.xlsx`);
  } catch (exception) {
    alert("파일다운로드 실패");
  }
}
