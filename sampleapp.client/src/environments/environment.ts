export const environment = {
  production: true,

  //base URL
  baseUrl: 'https://localhost:443', //replace with domain name of site
  //Account & Security
  loginUrl: "/api/account/login",
  registerUrl: "/api/account/register",
  refreshUrl: "/api/account/refresh",
  forgotPwdUrl: "/api/account/forgotPassword",
  resetPwdUrl: "/api/account/resetPassword",
  manageAccUrl: "/api/account/manage/info",
  confirmEmailUrl: "/api/account/confirmEmail",
  resendConfirmationEmailUrl: "/api/account/resendConfirmationEmail",
  // Engineer Salary
  dataUrl: '/api/DataEngineerSalary',
  getTitles: '/uniqueJobTitles',
  getByRemote: '/remote',
  getById: '/by-id',
  topPaid: '/top',
  getByTitle: '/title',
  //variables for reference
  authKey: "Auth" // localstorage variable keyname. stores auth object as "Auth" in local storage
};
