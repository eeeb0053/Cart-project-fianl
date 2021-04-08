import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import { style } from 'styled-system';

const VerticalWrapper = styled.div`
  padding: 50px 50px 50px 0px;
  display: flex;
  flex-wrap: wrap;
  width: 25%;
  
  ul, li {
    list-style: none;
    padding: 0px;
    margin: 0px;
  }
  a {
    text-decoration: none;
    color: inherit;
    font-weight: bold;
  }
  .vertab {
    text-align: center;
    position: fixed;
  }
  .vertab>ul {
    display: inline-block;
  }
  .vertab>ul>li {
    background-color: #f0f0f0;
    margin-bottom: 10px;
  }
  .vertab>ul>li>a {
    display: block;
    padding: 1rem 2rem;
  }
  .vertab>ul>li:hover>a {
    color: white;
    background-color: #302f2f;
  }
 
`;

export const TabWrapper = styled.div`
`;

export default VerticalWrapper;