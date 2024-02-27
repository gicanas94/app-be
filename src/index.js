const express = require('express');
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');

const app = express();
const port = 3000;

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

app.get('/', (req, res) => {
  res.send('Welcome to the app!');
});

app.get('/download', async (req, res) => {
  const videoURL = req.query.url;

  if (!videoURL || !ytdl.validateURL(videoURL)) {
    return res.status(400).send('Invalid URL');
  }

  try {
    let info = await ytdl.getInfo(videoURL);
    let audioFormats = ytdl.filterFormats(info.formats, 'audioonly');

    if (audioFormats.length === 0) {
      return res.status(404).send('No audio formats available');
    }

    const format = ytdl.chooseFormat(audioFormats, { quality: 'highestaudio' });
    const { title } = info.videoDetails;
    const filename = `${title}.mp3`;

    res.header('Content-Disposition', `attachment; filename="${filename}"`);
    res.header('Content-Type', 'audio/mpeg');

    const audioStream = ytdl(videoURL, { format });

    ffmpeg(audioStream)
      .audioBitrate(320)
      .toFormat('mp3')
      .pipe(res, { end: true });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error while downloading');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
