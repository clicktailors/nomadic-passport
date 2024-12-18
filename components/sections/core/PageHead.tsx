import Head from "next/head";
import { SITE_NAME } from "../../../lib/constants";

const PageHead = ({ pageTitle }: { pageTitle: string }) => (
  <Head>
    <title>{`${pageTitle} | ${SITE_NAME}`}</title>
  </Head>
);

export default PageHead;