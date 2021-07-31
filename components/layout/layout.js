import { company } from "faker";
import Footer from "../footer/footer";
import Navbar from "../navbar";
import SecondaryNavbar from "../navbar/secondaryNavbar";

const Layout = ({ children, showSearch, showSecondaryNavbar, company }) => {
  return (
    <div className="grid grid-rows-3 min-h-screen">
      <section className="row-span-full">
        <Navbar showSearch={showSearch} />
        {showSecondaryNavbar ? (
          <SecondaryNavbar
            balanceSheetId={company.balanceSheetId}
            profitLossId={company.profitLossId}
          />
        ) : null}
        <main className="row-end-auto">{children}</main>
      </section>
      <Footer />
    </div>
  );
};

export default Layout;
