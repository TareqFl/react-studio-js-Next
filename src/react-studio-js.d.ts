declare module 'react-studio-js'{

  type TAnnotation = {
    id: string;
    start: number;
    end: number;
    lines: string[];
    lang: string;
  };


type Controls =  {
  class:string,
  title:string,
  action:(annotaion:TAnnotation, i:number,annotations:TAnnotation[], opts:{
    linkEndpoints:true | false
  })=> void
}[]


type TArgs =  {
    ac: AudioContext ,
    container: Node,
    state: 'cursor' | 'fadein' | 'fadeout' | 'select' | 'shift',
    mono: true | false,
    samplesPerPixel: number | 500,
    waveHeight: number | 100,
    fadeType?: "logarithmic" | 'linear' | 'sCurve' | 'exponential', 
    isAutomaticScroll: true | false,
    timescale: true | false,
    barGap: number | 1,
    colors: {
      waveOutlineColor: string | '#222B36',
      timeColor: string | 'grey',
      fadeColor: string | 'black',
    },
    controls:  {
      show: true | false,
      width: number | 175,
      widgets: {
        collapse: false,
        muteOrSolo: true | false,
        volume: true | false,
        stereoPan: true | false,
        remove: true | false,
      },
    },
    annotationList: null | {
      annotations: [],
      controls: Controls,
      editable: true | false,
      isContinuousPlay: true | false,
      linkEndpoints: true | false,
    },

    zoomLevels: number[] | [500, 1000, 2000],
    seekStyle: 'fill' | 'line',
  }






    function ReactStudioJS(arg1:TArgs,ee:any):any{}


    export = ReactStudioJS
}