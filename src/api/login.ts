import axios from "/@/utils/axios";

function sendCodeApi(phoneNumber: string) {
  return axios.post({
    url: "/dmp/auth/sms",
    data: {
      phoneNumber,
    },
  });
}

function validateCodeApi(data: { phoneNumber: string; smsCode: string }) {
  return axios.post({
    url: "/dmp/auth/sms/verify",
    data,
  });
}

function loginApi(data: {
  phoneNumber: string;
  smsCode?: string;
  password?: string;
}) {
  return axios.post({
    url: "/dmp/auth/login",
    data,
  });
}

function logoutApi() {
  return axios.post({
    url: "/dmp/auth/logout",
    data: {},
  });
}

function forgetPasswordApi(data: {
  phoneNumber: string;
  smsCode: string;
  password: string;
}) {
  return axios.post({
    url: "/dmp/auth/password/forget",
    data,
  });
}

export { sendCodeApi, validateCodeApi, loginApi, logoutApi, forgetPasswordApi };
