# NewsList

App id: 51915451

Ссылка на приложение: 

### Используемые технологии: 
 - React v.18.2.0;
 - Redux toolkit v.2.2.3;
 - vk-mini-apps-router v.1.4.2;
 - VKUI v.6.0.0;
 - VK Icons v.2.92.0;
 - TypeScript v.5.2.2.

## 🚀 Запуск мини приложения

Запустить мини апп

```sh
 yarn start
```

Перейдите на [devportal](https://dev.vk.com/ru) или в [управление](https://vk.com/apps?act=manage) и создайте новый мини апп.  
Вставьте URL на котором работает ваше приложение в настройки, предварительно включив режим разработки.
Теперь можете открыть мини апп, нажав на его иконку.
Список всех созданных вами мини приложений вы сможете найти [тут](https://vk.com/apps?act=manage) или [тут](https://dev.vk.com/ru/admin/apps-list).

## 🌐 Деплой мини приложения

Для того чтобы поделиться приложением запущенным на localhost со своими друзьями, вы можете скачать утилиту vk-tunnel и запустить уже подготовленный скрипт из package.json

```sh
yarn global add @vkontakte/vk-tunnel
yarn run tunnel
```

После чего вы получите ссылку, по которой ваше приложение будет доступно с любого устройства, подробнее про vk-tunnel можно прочитать [тут](https://dev.vk.com/ru/libraries/tunnel).

Для того чтобы захостить ваше приложение на сервера ВКонтакте нужно зайти в vk-hosting-config.json и указать id вашего приложения. Далее можно запустить уже подготовленный скрипт:

```sh
yarn run deploy
```

После чего, вы получите бессрочную ссылку на ваш мини апп.

## 🗂️ Предустановленные библиотеки

Мы подготовили для вас набор пакетов, с которыми вам будет легко начать разрабатывать мини аппы
| Пакет | Назначение |
| ------ | ------ |
| [vk-bridge](https://dev.vk.com/ru/mini-apps/bridge) | Библиотека для отправки команд и обмена данными с платформой ВКонтакте. |
| [VKUI](https://vkcom.github.io/VKUI/) | Библиотека React-компонентов для создания мини-приложений в стиле ВКонтакте. |
| [vk-bridge-react](https://www.npmjs.com/package/@vkontakte/vk-bridge-react) | Пакет, который даёт возможность использовать события библиотеки VK Bridge в React-приложениях. |
| [vk-mini-apps-router](https://dev.vk.com/ru/libraries/router) | Библиотека для маршрутизации и навигации в мини-приложениях, созданных с помощью VKUI. |
| [icons](https://vkcom.github.io/icons/) | Набор иконок для использования в компонентах VKUI. |
| [vk-miniapps-deploy](https://dev.vk.com/ru/mini-apps/development/hosting) | Пакет для размещения файлов мини-приложения на хостинге ВКонтакте. |
| [eruda](https://www.npmjs.com/package/eruda) | Консоль для мобильного браузера|

## 📎 Полезные ссылки

[Dev портал разработчиков](https://dev.vk.com/ru)  
[Пример мини приложения](https://dev.vk.com/ru/mini-apps/examples/shop)  
[Если столкнулись с проблемами](https://github.com/VKCOM/create-vk-mini-app/issues)
