import React from "react";
import styled from "@emotion/styled";

const ObjectPositionFit = styled.div`
  display: flex;
  object-fit: none;
  object-position: -35px 10px;

  @media (min-width: 38rem) {
    align-items: center;
    object-fit: unset;
    object-position: unset;
  }
`;

const ObjectPositionFitQuery = ({ children }) => {
  return <ObjectPositionFit>{children}</ObjectPositionFit>;
};

export default ObjectPositionFitQuery;
