import { message } from "ant-design-vue";
import axios from "/@/utils/axios";

export default function download(url: string, fileName: string, params?) {
  axios
    .get({
      url: url,
      responseType: "blob",
      params: params,
    })
    .then((res) => {
      const blob = new Blob([res], { type: "text/csv" });
      if (res.type == "application/json") {
        const reader = new FileReader();
        reader.readAsText(blob, "utf8");
        reader.onload = function () {
          const content = JSON.parse(this.result?.toString() || "{}");

          if (content.code != 0) {
            message.error(content.msg);
          }
        };
        return;
      }
      const dom = document.createElement("a");
      const url = window.URL.createObjectURL(blob);
      dom.href = url;
      dom.download = fileName;
      dom.style.display = "none";
      document.body.appendChild(dom);
      dom.click();
      dom.parentNode?.removeChild(dom);
      window.URL.revokeObjectURL(url);
    });
}

export function downloadByWindow(url: string) {
  window.open(url, "_self");
}
