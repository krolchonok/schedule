const MyApp = {
  initData: Telegram.WebApp.initData || "",
  initDataUnsafe: Telegram.WebApp.initDataUnsafe || {},

  init(options) {
    Telegram.WebApp.isVerticalSwipesEnabled = false;

    const mainButton = Telegram.WebApp.MainButton;
    const secondaryButton = Telegram.WebApp.SecondaryButton;
    const settingsButton = Telegram.WebApp.SettingsButton;

    const mainButtonParams = {
      text: "Завтра",
      position: "left",
      is_visible: true,
    };

    mainButton.setParams(mainButtonParams)
      .onClick(() => {
        switchDay();
      });

    const secondaryButtonParams = {
      text: "Выбрать день",
      is_visible: true,
      position: "right",
      textColor: Telegram.WebApp.themeParams.button_text_color,
      color: Telegram.WebApp.themeParams.button_color,
    };

    secondaryButton.setParams(secondaryButtonParams)
      .onClick(() => {
        if (oldStyle) {
          OpenDaySelector();
        } else {
          newOpenDaySelector();
        }
      });

    settingsButton.isVisible = true;
    settingsButton.show();
    settingsButton.onClick(() => {
      showSettingsPage();
    })
    Telegram.WebApp.ready();
  },
};
Telegram.WebApp.SecondaryButton.textColor = Telegram.WebApp.themeParams.button_text_color;

MyApp.init();
