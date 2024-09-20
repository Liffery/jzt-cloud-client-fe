import axios from "/@/utils/axios";

function getCategoryListApi() {
  return axios.get({
    url: "/mock/dmp/category/all",
    params: {},
  });
}

function addStoreApi(data: {
  merchantName: string;
  categoryIdList: number[];
  account: string;
  password: string;
}) {
  return axios.post({
    url: "/mock/dmp/merchant",
    data,
  });
}

function updateStoreInfoApi(
  id: number,
  params: {
    account: string;
    password: string;
  }
) {
  return axios.put({
    url: `/mock/dmp/merchant/${id}`,
    params,
  });
}

function getTaskListApi(params: {
  pageNum: number;
  pageSize: number;
  merchantIdList: number[];
}) {
  return axios.get({
    url: "/mock/dmp/crowd/page",
    params,
  });
}

function getAllStoreInfoApi() {
  return axios.get({
    url: "/mock/dmp/merchant/all",
  });
}

export {
  getCategoryListApi,
  addStoreApi,
  updateStoreInfoApi,
  getTaskListApi,
  getAllStoreInfoApi,
};
