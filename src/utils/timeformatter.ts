export function secondsToHMS(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    if (minutes > 60) {
      minutes = parseFloat(String(0.0));
    }
    // const remainingSeconds = Math.round(seconds);
    let remainingSeconds = parseFloat(String(seconds % 60)).toFixed(2);
    if (Number(remainingSeconds) > 60) {
      remainingSeconds = String(parseFloat(String(0.01)));
    }

    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = remainingSeconds.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }