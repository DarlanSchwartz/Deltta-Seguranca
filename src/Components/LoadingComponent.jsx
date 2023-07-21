import { MutatingDots } from "react-loader-spinner";
import { styled } from "styled-components";
import { loadingComponentMainColor, loadingComponentSecondaryColor } from "../colors";

export default function LoadingComponent()
{
    return(
        <SCLoadingContainer>
            <MutatingDots 
                height="100"
                width="100"
                color={loadingComponentMainColor}
                secondaryColor={loadingComponentSecondaryColor}
                radius='12.5'
                ariaLabel="mutating-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                />
        </SCLoadingContainer>
    );
}

const SCLoadingContainer = styled.div`

    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    z-index: 5;

`;