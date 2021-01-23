$(function () {
  var form = layui.form;
  var layer = layui.layer;
  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return "昵称长度必须在1~6个字符之间";
      }
    },
  });
  initUserInfo();

  // 初始化用户的基本信息
  function initUserInfo() {
    $.ajax({
      method: "GET",
      url: "/my/userinfo",
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("获取用户信息失败！");
        }
        console.log(res);
        // layui 快速给表单赋值 需要给对应form表单添加 lay-filter 属性
        form.val("formUserInfo", res.data);
      },
    });
  }

  // 重置表单的数据
  $("#btnReset").on("click", function (e) {
    // 阻止默认重置行为
    e.preventDefault();
    initUserInfo();
  });

  // 监听表单的提交时间
  $(".layui-form").on("submit", function (e) {
    // 阻止表单的默认提交行为
    e.preventDefault();
    // 发起ajax数据请求
    $.ajax({
      method: "POST",
      url: "/my/userinfo",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("更新个人信息失败！");
        }
        layer.msg("更新用户信息成功！", { time: 1000 }, function () {
          window.parent.getUserInfo();
        });
      },
    });
  });
});
