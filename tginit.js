const MyApp = {
  initData: Telegram.WebApp.initData || "",
  initDataUnsafe: Telegram.WebApp.initDataUnsafe || {},
  MainButton: Telegram.WebApp.MainButton,

  init(options) {
    Telegram.WebApp.ready();
    Telegram.WebApp.MainButton.setParams({
      text: "Close",
      is_visible: true,
    }).onClick(() => {
      Telegram.WebApp.close();
    });
  },
  expand() {
    Telegram.WebApp.expand();
  },
  close() {
    Telegram.WebApp.close();
  },
};

MyApp.init();
