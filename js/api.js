import {showAlert} from './dialog.js';
import {disableMapFilters} from './map.js';

const DATA_GET = 'https://27.javascript.pages.academy/keksobooking/data';
const DARA_SEND = 'https://27.javascript.pages.academy/keksobooking';

export const getData = (onSuccess) => {
  fetch(DATA_GET)
    .then((response) => response.json())
    .then((ads) => {
      onSuccess(ads);
    })
    .catch(() => {
      disableMapFilters();
      showAlert('Не удалось получить данные с сервера.');
    });
};

export const sendData = (onSuccess, onFail, body) => {
  fetch(
    DARA_SEND,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};
