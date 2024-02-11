import React from "react";
import { FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="bg-black text-white  py-4">
      <div className="container mx-auto">
        {/* Adjust spacing or styling as needed */}
        <div className="pb-4 lg:flex lg:flex-row lg:gap-x-12">

          <div className="mb-12">
            <h1 className="text-4xl font-bold">Zivana Store</h1>
            <div className="text-gray-500">
              © Zivana store All Rights Reserved 2024.
            </div>
          </div>

          <div className="mb-12">
            <h1 className="text-2xl font-bold">Tentang Kami</h1>
            <div className="text-gray-500">
              Kami adalah toko grosir alat rumah tangga yang ada di Kota Bengkulu <br />
              Kami menyediakan semua produk yang anda cari dan inginkan, seperti
              peralatan rumah tangga. 
            </div>
          </div>

          <div className="mb-12">
            <h1 className="text-2xl font-bold">Kontak Kami</h1>
            <div className="text-gray-500">
              <div className="flex items-center gap-x-2">
                <FaWhatsapp />
                <div>+62 81273312278</div>
              </div>
              <div className="flex items-center gap-x-2">
                <FaFacebook />
                <div>@ZivanaStore</div>
              </div>
              <div className="flex items-center gap-x-2">
                <FaInstagram />
                <div>@ZivanaStore</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <footer className="bg-gray-800 text-white p-4 text-center">
    //   <p>&copy; 2024 Your Company. All rights reserved.</p>
    // </footer>
  );
};

export default Footer;
