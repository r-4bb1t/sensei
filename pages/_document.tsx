import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta
          property="og:image"
          content="https://sensei-nu.vercel.app/meta.png"
        />
        <meta name="og:site_name" content="난 선생이고 넌 학생이야!" />
        <meta
          name="og:description"
          content="학생들의 잠재력을 최대한 발휘하여 대학 입시에서 성공을 이루어 보세요."
        />
        <title>난 선생이고 넌 학생이야!</title>
      </Head>
      <body>
        <meta property="og:title" content="난 선생이고 넌 학생이야!" />
        <Main />
        <Script
          id="vh"
          strategy="afterInteractive"
        >{`let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', \`\${vh}px\`);
`}</Script>
        <NextScript />
      </body>
    </Html>
  );
}
