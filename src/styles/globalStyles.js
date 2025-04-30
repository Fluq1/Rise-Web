import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif;
  }

  body {
    background: linear-gradient(160deg, #f5f5f7 0%, #e8ebee 100%);
    min-height: 100vh;
    color: #1d1d1f;
  }

  .frosted-glass {
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: saturate(180%) blur(20px);
    border-radius: 18px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }

  input, button {
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  }
`;