import axios from "/@/utils/axios";
function getUserInfoApi() {
  return axios.get({
    url: "/mock/dmp/user/info",
    params: {},
  });
}
function getPurchaseRecordApi() {
  return axios.get({
    url: "/mock/dmp/purchase_record/list",
    params: {},
  });
}
export { getUserInfoApi, getPurchaseRecordApi };
