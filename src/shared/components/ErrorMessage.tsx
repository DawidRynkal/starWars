import styled from "styled-components";

const ErrorMessage = ({ error, text }: { error: boolean; text: string }) => {
  return error ? <ErrorInfo>{text}</ErrorInfo> : null;
};

const ErrorInfo = styled.p`
  margin: 100px;
  justify-content: center;
  display: flex;
  color: ${({ theme: { colors } }) => colors.gray2};
  font-size: 18px;
`;

export default ErrorMessage;
