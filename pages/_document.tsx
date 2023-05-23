import { Html, Head, Main, NextScript } from "next/document";

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
        <meta property="og:title" content="난 선생이고 넌 학생이야!" />
        <title>난 선생이고 넌 학생이야!</title>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
