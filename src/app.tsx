import Taro, { useLaunch } from "@tarojs/taro";
import { PropsWithChildren } from "react";
import "./app.scss";

function App({ children }: PropsWithChildren<any>) {
  useLaunch(() => {
    if (Taro.canIUse("getUpdateManager")) {
      const updateManager = Taro.getUpdateManager();

      updateManager.onCheckForUpdate(function (res) {
        console.log("onCheckForUpdate====", res);

        // 请求完新版本信息的回调

        if (res.hasUpdate) {
          console.log("res.hasUpdate====");

          updateManager.onUpdateReady(function () {
            Taro.showModal({
              title: "更新提示",
              content: "新版本已经准备好，是否重启应用？",
              success: function (res) {
                console.log("success====", res);
                if (res.confirm) {
                  // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                  updateManager.applyUpdate();
                }
              },
            });
          });

          updateManager.onUpdateFailed(function () {
            // 新的版本下载失败
            Taro.showModal({
              title: "已经有新版本了哟~",
              content: "新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~",
            });
          });
        }
      });
    }
  });
  return children;
}

export default App;
