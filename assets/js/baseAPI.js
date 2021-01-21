// 注意：每次调用$.git() 或 $.post() 或 $.ajax()的时候
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们的ajax提供的配置对象
$.ajaxPrefilter(function (options) {
  // 在发起真正的 Ajax 请求之前，同意拼接请求的根路径
  options.url = "http://api-breakingnews-web.itheima.net" + options.url;

  // 统一为有权限的借口，设置 headers 请求头
  if (options.url.indexOf("/my/") !== -1) {
    options.headers = {
      Authorization: localStorage.getItem("token") || "",
    };
  }
  // 全局同意挂载 complete 回调函数
  options.complete = function (res) {
    //   console.log('执行了 complete 回调:');
    //   console.log(res);
    // 在complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
    if (
      res.responseJSON.status === 1 &&
      res.responseJSON.message === "身份认证失败！"
    ) {
      // 1. 强制情况 token
      localStorage.removeItem("token");
      // 2. 强制跳转到登录页面
      location.href = "login.html";
    }
  };
});
