function extractName(filePath) {
    const fileName = filePath.split('/').pop();
    const fileNameWithoutExtension = fileName.split('.').slice(0, -1).join('.');
    const splitedText = fileNameWithoutExtension.split('_');
    const title = splitedText.slice(1).join(' ');
    return title;
}