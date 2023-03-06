import http from "./http";
import moment from "moment";
// import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import ExcelJS from "exceljs";
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
    const wb = new ExcelJS.Workbook();
    const ws = wb.addWorksheet(name);
    const columns = Object.keys(data[0]);
    // worksheet에 컬럼에 대한 정보를 줌
    // 맨 첫 번째 줄에 컬럼들이 삽입됨
    ws.columns = columns.map((column) => ({
      header: column, // 컬럼 이름
      key: column, // data에서 컬럼의 값을 구분하기 위한 key
      width: 40,
      style: {
        font: {
          size: 12,
        },
        alignment: {
          vertical: "middle",
          horizontal: "center",
          wrapText: true,
        },
      },
    }));
    ws.getRow(1).fill = {
      type: "pattern",
      pattern: "darkTrellis",
      bgColor: { argb: "bcc0c8" },
    };
    ws.getRow(1).font = {
      bold: true,
      size: 15,
    };
    console.log(ws.getRow(1));
    ws.insertRows(2, data);
    const bf = await wb.xlsx.writeBuffer();
    saveAs(new Blob([bf]), `${name}_${moment().valueOf()}.xlsx`);
  } catch (exception) {
    alert("파일다운로드 실패");
  }
}
