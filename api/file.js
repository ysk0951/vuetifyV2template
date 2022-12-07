import http from "./http";
import moment from "moment";
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
