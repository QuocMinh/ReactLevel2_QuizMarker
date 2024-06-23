import { appSelector } from "@store/slices/appSlice";
import { memo } from "react";
import { useSelector } from "react-redux";
import { Spinner } from "reactstrap";
import styled from "styled-components";

export const LoadingScreen = memo(() => {
  const loading = useSelector(appSelector.loading);
  return loading ? (
    <SpinnerContainer>
      <Spinner color="primary" />
    </SpinnerContainer>
  ) : null;
});

const SpinnerContainer = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 1000;

  .spinner-border {
    height: 3rem;
    width: 3rem;
  }
`;
