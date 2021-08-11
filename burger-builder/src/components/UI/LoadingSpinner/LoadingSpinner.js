import PropagateLoader from "react-spinners/PropagateLoader";
import { css } from "@emotion/react";

const styling = css`
    display: flex;
    top: 50%;
`;

const loadingSpinner = () => {
    return (
        <PropagateLoader 
            css = {styling}
            color={"#fff"} 
            size={15} />
    );
};

export default loadingSpinner;