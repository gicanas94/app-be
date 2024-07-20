// @packages
import ffmpeg from 'fluent-ffmpeg';
import ytdl from 'ytdl-core';

export const download = async (req, res) => {
  const videoURL = req.query.url;

  if (!videoURL || !ytdl.validateURL(videoURL)) {
    return res.status(400).send('Invalid URL');
  }

  try {
    const info = await ytdl.getInfo(videoURL);
    const audioFormats = ytdl.filterFormats(info.formats, 'audioonly');

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

    return res;
  } catch (error) {
    return res.status(500).send('Error while downloading');
  }
};
