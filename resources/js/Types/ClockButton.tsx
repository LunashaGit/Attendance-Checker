export type Time = {
    startTime: {
        hours: string;
        minutes: string;
    };
    endTime: {
        hours: string;
        minutes: string;
    };
    late?: {
        hours: string;
        minutes: string;
    };
    before?: {
        hours: string;
        minutes: string;
    };
    nextTimer?: {
        hours: string;
        minutes: string;
    };
};

export type Value = {
    hours: string;
    minutes: string;
};
