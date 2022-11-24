const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const avatarChooser = document.querySelector('#avatar');
export const avatarPreview = document.querySelector('.avatar-image');
const photoChooser = document.querySelector('#images');
const cloneAvatar = avatarPreview.cloneNode(false);
export const photoPreviewContainer = document.querySelector('.ad-form__photo');

const fileChooser = (file, preview) => {
  file.addEventListener('change', () => {
    const avatarFile = file.files[0];
    const avatarFileName = avatarFile.name.toLowerCase();

    const avatarMatches = FILE_TYPES.some((it) => avatarFileName.endsWith(it));

    if (avatarMatches) {
      preview.src = URL.createObjectURL(avatarFile);
    }
  });
};

const clonePhoto = (clone, preview) => {
  preview.appendChild(clone);
  clone.alt = 'Фото квартиры';
  clone.classList.remove('avatar-image');
  clone.classList.add('form-photo');
};

const createPhoto = (file, clone, preview) => {
  photoChooser.addEventListener('change', () => {
    clonePhoto(clone, preview);
    const avatarFile = file.files[0];
    const avatarFileName = avatarFile.name.toLowerCase();

    const avatarMatches = FILE_TYPES.some((it) => avatarFileName.endsWith(it));

    if (avatarMatches) {
      clone.src = URL.createObjectURL(avatarFile);
    }
  });
};

fileChooser(avatarChooser, avatarPreview);
createPhoto(photoChooser, cloneAvatar, photoPreviewContainer);
