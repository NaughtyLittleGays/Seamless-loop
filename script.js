const { createFFmpeg, fetchFile } = FFmpeg;
const ffmpeg = createFFmpeg({ log: true });

document.getElementById('processButton').addEventListener('click', async () => {
	const videoInput = document.getElementById('videoInput').files[0];
	if (!videoInput) {
		alert('Please upload a video file first.');
		return;
	}

	await ffmpeg.load();
	ffmpeg.FS('writeFile', 'input.mp4', await fetchFile(videoInput));

	// Example processing: Convert video to grayscale
	await ffmpeg.run('-i', 'input.mp4', '-vf', 'hue=s=0', 'output.mp4');

	const data = ffmpeg.FS('readFile', 'output.mp4');
	const videoBlob = new Blob([data.buffer], { type: 'video/mp4' });
	const url = URL.createObjectURL(videoBlob);

	const downloadLink = document.getElementById('downloadLink');
	downloadLink.href = url;
	downloadLink.download = 'output.mp4';
	downloadLink.style.display = 'block';
	downloadLink.textContent = 'Download Processed Video';
});