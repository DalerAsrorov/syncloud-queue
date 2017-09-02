declare module 'styled-components' {
    declare var exports: any;
}

export type SCProps = {
    playing: boolean,
    seeking: boolean,
    track: Object,
    duration: number,
    currentTime: number,
    soundCloudAudio: Object
};
