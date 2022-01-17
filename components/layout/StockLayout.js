import Footer from "../footer/footer";
import Navbar from "../navbar";
import StockNavbar from "../navbar/StockNavbar";

const StockLayout = ({ children }) => {
  return (
    <>
      <div className="grid grid-rows-3 min-h-screen">
        <section className="row-span-full">
          <Navbar showSearch={true} />
          <StockNavbar />
          <main className="row-end-auto">{children}</main>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default StockLayout;
