## pauseable-buffer-source
- Audio Source Buffer That can be play pause and resume.

## Usage
As you know `BufferSource` of js `AudioContext` just can be start once and there is no methods to do play-pause functionality. 
in `PauseableBufferSource.js` You can create an Instance that can do it for you simply .

## example
```
window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;
const ctx = new AudioContext();
const buffer = ctx.createBuffer(2, 22500, 44100)
const source = new CustomBufferSource(ctx,buffer);
source.play()
source.pause()
source.play()
source.stop()
```

## :)
