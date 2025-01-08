import { Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { memo } from "react";
import { EDirection } from "./types/directionType";

const DialogTransition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction={EDirection.UP} ref={ref} {...props} />;
});

export default memo(DialogTransition);