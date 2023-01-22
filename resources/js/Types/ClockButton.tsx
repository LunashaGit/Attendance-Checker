export type Time = {
    startTime: {
        hours: Number;
        minutes: Number;
    };
    endTime: {
        hours: Number;
        minutes: Number;
    };
    late?: {
        hours: Number;
        minutes: Number;
    };
    before?: {
        hours: Number;
        minutes: Number;
    };
    nextTimer?: {
        hours: Number;
        minutes: Number;
    };
};

export type Value = {
    hours: Number;
    minutes: Number;
};
