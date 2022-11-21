const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const avatarChooser = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.avatar-image');
const photoChooser = document.querySelector('#images');
const photoPreview = document.querySelector('.avatar-photos');

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

fileChooser(avatarChooser, avatarPreview);
fileChooser(photoChooser, photoPreview);
