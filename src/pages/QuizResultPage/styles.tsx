import styled from "styled-components";

export const QuizScoreContainer = styled.div<{ $color?: string }>`
  text-align: center;
  span {
    background-color: ${(props) => props.$color ?? "#FFF"};
  }
`;
