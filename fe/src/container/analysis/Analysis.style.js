import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

export const Wrapper = styled.div`
  height: 200px;
  display: flex;
  position: absolute;
  overflow: visible;
  align: center;
  flex-wrap: wrap;
  width: 75%;
  margin-left: 150px;
  margin-top: 50px;
  .left {
    width: 50%;
    float: left;
    box-sizing: border-box;
    }
  .right {
      width: 50%;
      float: right;
      box-sizing: border-box;
  }
`;
