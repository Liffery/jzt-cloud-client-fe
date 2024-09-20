const FILE_MAX_SIZE = 2 * 1024 * 1024 * 1024;
const inspectionList = [
  {
    f: (files: FileList) => !files || files.length != 1,
    message: "请选择一个文件",
  },
  {
    f: (files: FileList) => files[0].size === 0,
    message: "文件不能为空",
  },
  {
    f: (files: FileList) => files[0].size > FILE_MAX_SIZE,
    message: "文件大小不能超过2G",
  },
  {
    f: (files: FileList) => {
      const fileNameSplit = files[0].name.split(".");
      return fileNameSplit.pop() != "csv";
    },
    message: "上传失败，文件类型错误",
  },
];

/**
 * @param files 用户选择的文件
 * @returns 文件是否符合格式，不符合则返回原因
 */
export function checkFile(files: FileList) {
  for (const inspection of inspectionList) {
    if (inspection.f(files)) {
      return inspection.message;
    }
  }
  return null;
}
// 获取上传文件内容
export function readAndPrintFileContent(file: File) {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = (event) => {
      const fileContent = event.target?.result;
      resolve(fileContent);
    };
    reader.readAsText(file);
  });
}
