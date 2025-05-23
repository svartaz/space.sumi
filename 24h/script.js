const tau = Math.PI * 2;

const angleOfHour = hour =>
  tau * hour / 24 - tau / 4;

document.addEventListener('DOMContentLoaded', () => {
  const textarea = document.querySelector('textarea');
  const div = document.querySelector('div');

  const canvas = document.querySelector('canvas');
  const context = canvas.getContext('2d');
  context.imageSmoothingEnabled = false;

  const w = 1080;
  canvas.width = w;
  canvas.height = w;

  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const rMax = Math.min(cx, cy);
  const r = rMax * 14 / 16;

  const draw = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.lineWidth = rMax / 512;

    for (let h = 0; h < 24; h++) {
      const angle = angleOfHour(h);
      const r1 = rMax * 15 / 16;

      const x = cx + r1 * Math.cos(angle);
      const y = cy - r1 * Math.sin(angle);

      context.font = `${rMax / 20}px sans-serif`;
      context.fillStyle = 'black'
      context.fillText(String(h), x, y);
    }

    const indices = [];
    textarea.value.split('\n').forEach((line, i) => {
      try {
        let [h0, m0, h1, m1, color, textColor, text] = line.trim().match(/(\d+):(\d+),(\d+):(\d+),(.+?),(.+?),(.*)/).slice(1);

        const hour0 = Number(h0.trimStart(0)) + Number(m0.trimStart(0)) / 60;
        let hour1 = Number(h1.trimStart(0)) + Number(m1.trimStart(0)) / 60;
        while (hour1 < hour0)
          hour1 += 24;

        const angle0 = angleOfHour(hour0);
        const angle1 = angleOfHour(hour1);

        context.fillStyle = color;
        context.beginPath()
        context.moveTo(cx, cy);
        context.arc(cx, cy, r, tau - angle0, tau - angle1, true);
        context.moveTo(cx, cy);
        context.fill();

        const rText = r * 3 / 5;
        const angleText = (angle0 - angle1) / 2 - angle0;
        const xText = cx + rText * Math.cos(angleText);
        const yText = cy + rText * Math.sin(angleText);

        context.font = `${Math.min(w / 12, w / 32 * (hour1 - hour0))}px sans-serif`;
        context.fillStyle = textColor;
        context.fillText(text, xText, yText);
      } catch (e) {
        console.log(e);
        indices.push(i);
      }
    });

    return indices;
  };

  textarea.addEventListener('input', event => {
    const indices = draw();
    if (0 < indices.length)
      div.innerHTML = `error line: ${indices.join(', ')}`;
  });

  draw();
});