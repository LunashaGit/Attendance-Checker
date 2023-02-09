import React, { useState, useEffect } from "react";
import ClockButton from "@/Components/Custom/ClockButton";
import Calendar from "@/Components/Custom/Calendar";
import axios from "axios";

export default function Testing(props) {
    console.log(props);
    return (
        <>
            <img src={"/images/" + props.absences[4].file} />
        </>
    );
}
