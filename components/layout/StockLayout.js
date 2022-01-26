import Footer from '../footer/footer';
import Navbar from '../navbar';
import StockNavbar from '../navbar/StockNavbar';
import Head from 'next/head';

const StockLayout = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <Head>
        <meta property="og:title" content="My new title" key="title" />
      </Head>
      <div className="grid grid-rows-3 min-h-screen">
        <section className="row-span-full">
          <Navbar showSearch={true} showSymbol={true} searchBarWidth={'lg:w-10/12'} />
          <StockNavbar />
          <main className="row-end-auto">{children}</main>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default StockLayout;
