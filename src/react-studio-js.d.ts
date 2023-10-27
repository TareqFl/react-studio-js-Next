declare module 'react-studio-js'{

type TArgs =  {
    ac: any,
    container: Node,
    state: string,
    mono: boolean,
    samplesPerPixel: number | 500,
    waveHeight: number | 100,
    isAutomaticScroll: boolean,
    timescale: boolean,
    barGap: number | 1,
    colors: {
      waveOutlineColor: string | '#222B36',
      timeColor: string | 'grey',
      fadeColor: string | 'black',
    },
    controls: null | {
      show: boolean,
      width: number | 175,
      widgets: {
        collapse: boolean | false,
      },
    },
    annotationList: null | {
      annotations: [],
      controls: any,
      editable: boolean,
      isContinuousPlay: boolean,
      linkEndpoints: boolean,
    },

    zoomLevels: number[] | [500, 1000, 2000],
    seekStyle: string | 'fill',
  }






    function ReactStudioJS(arg1:TArgs,ee:any):any{}


    export = ReactStudioJS
}