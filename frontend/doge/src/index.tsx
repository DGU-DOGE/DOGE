import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { RecoilRoot } from "recoil";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { QueryClient, QueryClientProvider } from "react-query";
import { theme } from "./theme";
import router from "./routes/Router";
import { CookiesProvider } from "react-cookie";

const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: 'Do Hyeon';
  font-style: normal;
  font-weight: 100;
  src: url('./assets/fonts/DoHyeon-Regular.ttf') format("truetype") url("./assets/fonts/AnyConv.com__DoHyeon-Regular.woff") format("woff");
}
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}

*{
  box-sizing: border-box;
}
body{  
  font-family: 'Do Hyeon';
  color: ${(props) => props.theme.black.darker};  
  line-height: 1.2;
}
a{
  text-decoration: none;
  color: inherit;
}
`;

const client = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <RecoilRoot>
        <QueryClientProvider client={client}>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <RouterProvider router={router} />
          </ThemeProvider>
        </QueryClientProvider>
      </RecoilRoot>
    </CookiesProvider>
  </React.StrictMode>
);

reportWebVitals();
