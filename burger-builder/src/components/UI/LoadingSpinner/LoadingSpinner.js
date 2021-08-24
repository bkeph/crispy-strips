import PropagateLoader from "react-spinners/PropagateLoader";
import { css } from "@emotion/react";

const styling = css`
    display: flex;
    justify-content: center;
    top: 50%;
`;

const loadingSpinner = (props) => {
    const color = props.color
        ? props.color
        : "rgb(48, 48, 48)";

    return (
        <PropagateLoader 
            css = {styling}
            color={color} 
            size={15} />
    );
};

export default loadingSpinner;