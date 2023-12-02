export const formatTime = (time) => {
    let timeStr = String(time).padStart(4, '0');
    return timeStr.slice(0, 2) + ':' + timeStr.slice(2);
};