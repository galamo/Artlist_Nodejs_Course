export module levelLogError {

    export enum levels  { 
        error= 0,
        warn = 1,
        info = 2,
        http = 3,
        verbose =  4,
        debug = 5,
        silly = 6
    }
    
    export const toString = (dir: levels):string => levels[dir]
}

