import Footer from "../footer/footer";
import Navbar from "../navbar";
import SecondaryNavbar from "../navbar/secondaryNavbar";

const SecondaryLayout = ({ children }) => {
  return (
    <div className="grid grid-rows-3 min-h-screen">
      <section className="row-span-full">
        <Navbar showSearch={true} />
        <SecondaryNavbar />
        <main className="row-end-auto">{children}</main>
      </section>
      <Footer />
    </div>
  );
};

export default SecondaryLayout;
