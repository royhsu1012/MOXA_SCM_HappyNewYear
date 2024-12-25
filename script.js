const canvas = document.getElementById('cardCanvas');
const ctx = canvas.getContext('2d');

// �w�]����
const background = new Image();
background.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVhvAvQ2U-g_wFSnscfghaKyhFFbgysZT1rQ&s'; // �ϥαz���Ϥ����}
background.onload = () => {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    drawText();
};

// ��r�ݩ�
const texts = [
    { input: 'textInput1', color: 'colorPicker1', size: 'fontSizeRange1', font: 'fontSelect1', x: canvas.width / 2, y: canvas.height / 4, fontSize: 36, colorValue: '#000000', fontFamily: 'Arial' },
    { input: 'textInput2', color: 'colorPicker2', size: 'fontSizeRange2', font: 'fontSelect2', x: canvas.width / 2, y: canvas.height / 2, fontSize: 36, colorValue: '#000000', fontFamily: 'Arial' },
    { input: 'textInput3', color: 'colorPicker3', size: 'fontSizeRange3', font: 'fontSelect3', x: canvas.width / 2, y: (canvas.height * 3) / 4, fontSize: 36, colorValue: '#000000', fontFamily: 'Arial' }
];

let isDragging = false;
let currentDraggingText = null;

// ø�s��r
function drawText() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    texts.forEach(text => {
        const input = document.getElementById(text.input);
        const color = document.getElementById(text.color);
        const size = document.getElementById(text.size);
        const font = document.getElementById(text.font);

        text.fontSize = parseInt(size.value, 10);
        text.colorValue = color.value;
        text.fontFamily = font.value;

        ctx.fillStyle = text.colorValue;
        ctx.font = `${text.fontSize}px ${text.fontFamily}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(input.value, text.x, text.y);
    });
}

// ��ť��J�M�վ�ƥ�
texts.forEach(text => {
    document.getElementById(text.input).addEventListener('input', drawText);
    document.getElementById(text.color).addEventListener('input', drawText);
    document.getElementById(text.size).addEventListener('input', drawText);
    document.getElementById(text.font).addEventListener('change', drawText);
});

// �U���P�d
function downloadCard() {
    const imageUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = '�P�d.png';  // �]�w�U�������W
    link.click();
}

// ��ť�ƹ��ƥ�
canvas.addEventListener('mousedown', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    texts.forEach((text, index) => {
        const textWidth = ctx.measureText(document.getElementById(text.input).value).width;
        const textHeight = text.fontSize;
        if (
            mouseX >= text.x - textWidth / 2 &&
            mouseX <= text.x + textWidth / 2 &&
            mouseY >= text.y - textHeight / 2 &&
            mouseY <= text.y + textHeight / 2
        ) {
            isDragging = true;
            currentDraggingText = index;
        }
    });
});

canvas.addEventListener('mousemove', (e) => {
    if (isDragging && currentDraggingText !== null) {
        const rect = canvas.getBoundingClientRect();
        texts[currentDraggingText].x = e.clientX - rect.left;
        texts[currentDraggingText].y = e.clientY - rect.top;
        drawText();
    }
});

canvas.addEventListener('mouseup', () => {
    isDragging = false;
    currentDraggingText = null;
});